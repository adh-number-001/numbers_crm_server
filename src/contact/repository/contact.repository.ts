import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { TempContactData, UpdateContact } from '../type';

@Injectable()
export class ContactRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getContactListByOption(
    page: number,
    pageSize: number,
    userId: number,
    contactCategoryId?: number,
    searchText?: string,
  ) {
    const offset = pageSize * (page - 1);

    const hasCategory = contactCategoryId !== undefined;
    const hasSearch = searchText !== undefined && searchText.trim().length > 0;

    const conditions: string[] = [
      `cc_filter."userId" = $1`,
      `c."isShownInList" = TRUE`,
      `cn."isMain" = TRUE`,
    ];

    if (hasCategory) conditions.push(`cncm_filter."contactCategoryId" = $2`);
    if (hasSearch) {
      const searchPlaceholder = hasCategory ? `$3` : `$2`;
      conditions.push(
        `(cn.name LIKE '%' || ${searchPlaceholder} || '%' 
          OR CAST(c."phoneNumber" AS TEXT) LIKE '%' || ${searchPlaceholder} || '%')`,
      );
    }

    const whereSql =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const params: (string | number)[] = [userId];
    if (hasCategory) params.push(contactCategoryId);
    if (hasSearch) params.push(searchText as string);
    params.push(pageSize, offset);

    const contactListQuery = `
        SELECT 
            c.id AS "contactId", 
            MAX(cn.name) AS "contactName",
            COALESCE(
                JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT('contactCategoryName', cc.name))
                FILTER (WHERE cc.name IS NOT NULL), '[]'
            ) AS "contactCategoryNameList"
        FROM "Contact" c
        LEFT JOIN "ContactName" cn ON c.id = cn."contactId"
        LEFT JOIN "ContactNameCategoryMapping" cncm_filter ON cn.id = cncm_filter."contactNameId"
        LEFT JOIN "ContactCategory" cc_filter ON cncm_filter."contactCategoryId" = cc_filter.id
        LEFT JOIN "ContactNameCategoryMapping" cncm_all ON cn.id = cncm_all."contactNameId"
        LEFT JOIN "ContactCategory" cc ON cncm_all."contactCategoryId" = cc.id
        ${whereSql}
        GROUP BY c.id
        ORDER BY
            MAX(cn.name) ~ '^[0-9]' DESC,
            LENGTH(MAX(cn.name)),
            NULLIF(CAST((SELECT (REGEXP_MATCHES(MAX(cn.name), '[0-9]+'))[1]) AS INTEGER), 0),
            MAX(cn.name) ASC
        LIMIT $${params.length - 1} OFFSET $${params.length};
    `;

    const contactList = await this.prismaService.$queryRawUnsafe<
      {
        contactName: string;
        contactId: number;
        contactCategoryNameList: { contactCategoryName: string }[];
      }[]
    >(contactListQuery, ...params);

    const totalCountQuery = `
      SELECT COUNT(DISTINCT c.id) as count
      FROM "Contact" c
      LEFT JOIN "ContactName" cn ON c.id = cn."contactId"
      LEFT JOIN "ContactNameCategoryMapping" cncm_filter ON cn.id = cncm_filter."contactNameId"
      LEFT JOIN "ContactCategory" cc_filter ON cncm_filter."contactCategoryId" = cc_filter.id
      ${whereSql};
    `;

    const totalCountParams = params.slice(0, params.length - 2);
    const totalCountResult = await this.prismaService.$queryRawUnsafe<
      { count: number }[]
    >(totalCountQuery, ...totalCountParams);

    const totalCount = Number(totalCountResult[0]?.count || 0);

    return { contactList, totalCount };
  }

  // TODO: 추후 트랜잭션 적용
  async checkAndStoreNewContactList(
    userId: number,
    contactCategoryId: number,
    contactList: UpdateContact[],
    uuid: string,
  ) {
    // 기존 메인 전화번호 조회 (Contact 테이블)
    const existingContacts = await this.prismaService.contact.findMany({
      where: {
        contactName: {
          some: {
            contactNameCategoryMapping: {
              some: { contactCategoryId, contactCategory: { userId } },
            },
          },
        },
      },
      select: { id: true, phoneNumber: true },
    });

    const existingContactMap = new Map(
      existingContacts.map((c) => [c.phoneNumber, c]),
    );

    // 기존 서브 전화번호가 해당 메인 번호에 `ContactMapping`으로 매핑되어 있는지 확인
    const existingMappings = await this.prismaService.contactMapping.findMany({
      where: {
        mainContactId: { in: existingContacts.map((c) => c.id) },
      },
      select: {
        mainContactId: true,
        subContactId: true,
        subContact: { select: { phoneNumber: true } },
      },
    });

    const existingSubPhones = existingMappings.reduce(
      (map, { mainContactId, subContact }) => {
        if (!map.has(mainContactId)) {
          map.set(mainContactId, new Set());
        }
        map.get(mainContactId)?.add(subContact.phoneNumber);
        return map;
      },
      new Map<number, Set<string>>(),
    );

    const tempData: TempContactData[] = [];

    contactList.forEach((contact) => {
      const existingMainContact = existingContactMap.get(
        contact.mainPhoneNumber,
      );

      // 메인 전화번호가 DB에 존재하는 경우
      if (existingMainContact) {
        contact.subPhoneNumberList.forEach((subPhone) => {
          const mainContactId = existingMainContact.id;
          const subPhoneSet = existingSubPhones.get(mainContactId) || new Set();

          // 서브 전화번호가 해당 메인 번호에 이미 `ContactMapping` 테이블을 통해 연결되어 있으면 패스
          if (!subPhoneSet.has(subPhone.phoneNumber)) {
            // 서브 전화번호가 기존 DB에 없으면 저장
            tempData.push({
              uuid,
              userId,
              contactCategoryId: null,
              name: null,
              note: null,
              phoneNumber: subPhone.phoneNumber,
              isMain: false,
              mainContactId,
              tempMainContactId: null,
            });
          }
        });
        return;
      }

      // 메인 전화번호가 없으면 임시 테이블에 저장
      tempData.push({
        uuid,
        userId,
        contactCategoryId,
        name: contact.name,
        note: contact.note,
        phoneNumber: contact.mainPhoneNumber,
        isMain: true,
        mainContactId: null,
        tempMainContactId: null,
      });

      // 서브 전화번호 저장 (메인 번호가 DB에 없어서 `tempMainContactId`로 연결)
      contact.subPhoneNumberList.forEach((subPhone) => {
        tempData.push({
          uuid,
          userId,
          contactCategoryId: null,
          name: null,
          note: null,
          phoneNumber: subPhone.phoneNumber,
          isMain: false,
          mainContactId: null,
          tempMainContactId: null,
        });
      });
    });

    if (tempData.length > 0) {
      await this.prismaService.tempContact.createMany({ data: tempData });
    }

    // DB에 저장된 메인 연락처의 `id` 조회
    const savedMainContacts = await this.prismaService.tempContact.findMany({
      where: {
        isMain: true,
        uuid,
      },
      select: { id: true, uuid: true },
    });

    // `uuid` 기준으로 `id` 매핑
    const mainIdMap = new Map(savedMainContacts.map((mc) => [mc.uuid, mc.id]));

    // `tempMainContactId` 업데이트
    await this.prismaService.tempContact.updateMany({
      where: {
        isMain: false,
        uuid,
      },
      data: {
        tempMainContactId: mainIdMap.get(uuid) ?? null, // 메인 연락처의 실제 ID로 업데이트
      },
    });

    return {
      count: tempData.length,
    };
  }
}
