import { EncryptionService } from '@common/util/encrypt/encrypt.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@prisma';

@Injectable()
export class ContactRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createContact(
    userId: number,
    name: string,
    phoneNumber: string,
    subContactList: string[],
    contactGroupIdList: number[],
    addressList: string[],
    vehicleList: string[],
    carNumberList: string[],
  ) {
    await this.prismaService.$transaction(async (tx) => {
      const contact = await tx.contact.create({
        data: {
          userId,
          name: this.encryptionService.encrypt(name),
          phoneNumber: this.encryptionService.encrypt(phoneNumber),
        },
      });

      await tx.subContact.createMany({
        data: subContactList.map((subPhoneNumber) => ({
          phoneNumber: this.encryptionService.encrypt(subPhoneNumber),
          contactId: contact.id,
        })),
      });

      await tx.contactGroupMapping.createMany({
        data: contactGroupIdList.map((contactGroupId) => ({
          contactGroupId,
          contactId: contact.id,
        })),
      });

      await tx.contactAddress.createMany({
        data: addressList.map((address) => ({
          body: this.encryptionService.encrypt(address),
          contactId: contact.id,
        })),
      });

      await tx.contactVehicle.createMany({
        data: vehicleList.map((vehicle) => ({
          body: this.encryptionService.encrypt(vehicle),
          contactId: contact.id,
        })),
      });

      await tx.contactCarNumber.createMany({
        data: carNumberList.map((carNumber) => ({
          body: this.encryptionService.encrypt(carNumber),
          contactId: contact.id,
        })),
      });
    });
  }

  async validateContactId(contactId: number) {
    const contact = await this.prismaService.contact.findFirst({
      where: { id: contactId },
    });
    if (!contact) {
      throw new NotFoundException('존재하지 않는 연락처입니다.');
    }
  }

  async validateUserIdAndContactId(userId: number, contactId: number) {
    const contact = await this.prismaService.contact.findFirst({
      where: { id: contactId, userId },
    });
    if (!contact) {
      throw new ForbiddenException('해당 계정의 연락처가 아닙니다.');
    }
  }

  getContactDetail(userId: number, contactId: number) {
    return this.prismaService.contact.findFirst({
      where: { id: contactId, userId },
      include: {
        subContact: { orderBy: { createdAt: 'asc' } },
        contactGroupMapping: {
          orderBy: { createdAt: 'asc' },
          include: { contactGroup: true },
        },
        contactAddress: { orderBy: { createdAt: 'asc' } },
        contactVehicle: { orderBy: { createdAt: 'asc' } },
        contactCarNumber: { orderBy: { createdAt: 'asc' } },
      },
    });
  }

  //   async getContactListByOption(
  //     page: number,
  //     pageSize: number,
  //     userId: number,
  //     contactCategoryId?: number,
  //     searchText?: string,
  //   ) {
  //     const offset = pageSize * (page - 1);

  //     const hasCategory = contactCategoryId !== undefined;
  //     const hasSearch = searchText !== undefined && searchText.trim().length > 0;

  //     const conditions: string[] = [
  //       `cc_filter."userId" = $1`,
  //       `c."isShownInList" = TRUE`,
  //       `cn."isMain" = TRUE`,
  //     ];

  //     if (hasCategory) conditions.push(`cncm_filter."contactCategoryId" = $2`);
  //     if (hasSearch) {
  //       const searchPlaceholder = hasCategory ? `$3` : `$2`;
  //       conditions.push(
  //         `(cn.name LIKE '%' || ${searchPlaceholder} || '%'
  //           OR CAST(c."phoneNumber" AS TEXT) LIKE '%' || ${searchPlaceholder} || '%')`,
  //       );
  //     }

  //     const whereSql =
  //       conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  //     const params: (string | number)[] = [userId];
  //     if (hasCategory) params.push(contactCategoryId);
  //     if (hasSearch) params.push(searchText as string);
  //     params.push(pageSize, offset);

  //     const contactListQuery = `
  //         SELECT
  //             c.id AS "contactId",
  //             MAX(cn.name) AS "contactName",
  //             COALESCE(
  //                 JSONB_AGG(DISTINCT JSONB_BUILD_OBJECT('contactCategoryName', cc.name))
  //                 FILTER (WHERE cc.name IS NOT NULL), '[]'
  //             ) AS "contactCategoryNameList"
  //         FROM "Contact" c
  //         LEFT JOIN "ContactName" cn ON c.id = cn."contactId"
  //         LEFT JOIN "ContactNameCategoryMapping" cncm_filter ON cn.id = cncm_filter."contactNameId"
  //         LEFT JOIN "ContactCategory" cc_filter ON cncm_filter."contactCategoryId" = cc_filter.id
  //         LEFT JOIN "ContactNameCategoryMapping" cncm_all ON cn.id = cncm_all."contactNameId"
  //         LEFT JOIN "ContactCategory" cc ON cncm_all."contactCategoryId" = cc.id
  //         ${whereSql}
  //         GROUP BY c.id
  //         ORDER BY
  //             MAX(cn.name) ~ '^[0-9]' DESC,
  //             LENGTH(MAX(cn.name)),
  //             NULLIF(CAST((SELECT (REGEXP_MATCHES(MAX(cn.name), '[0-9]+'))[1]) AS INTEGER), 0),
  //             MAX(cn.name) ASC
  //         LIMIT $${params.length - 1} OFFSET $${params.length};
  //     `;

  //     const contactList = await this.prismaService.$queryRawUnsafe<
  //       {
  //         contactName: string;
  //         contactId: number;
  //         contactCategoryNameList: { contactCategoryName: string }[];
  //       }[]
  //     >(contactListQuery, ...params);

  //     const totalCountQuery = `
  //       SELECT COUNT(DISTINCT c.id) as count
  //       FROM "Contact" c
  //       LEFT JOIN "ContactName" cn ON c.id = cn."contactId"
  //       LEFT JOIN "ContactNameCategoryMapping" cncm_filter ON cn.id = cncm_filter."contactNameId"
  //       LEFT JOIN "ContactCategory" cc_filter ON cncm_filter."contactCategoryId" = cc_filter.id
  //       ${whereSql};
  //     `;

  //     const totalCountParams = params.slice(0, params.length - 2);
  //     const totalCountResult = await this.prismaService.$queryRawUnsafe<
  //       { count: number }[]
  //     >(totalCountQuery, ...totalCountParams);

  //     const totalCount = Number(totalCountResult[0]?.count || 0);

  //     return { contactList, totalCount };
  //   }

  //   // TODO: 추후 트랜잭션 적용
  //   async checkAndStoreNewContactList(
  //     userId: number,
  //     contactCategoryId: number,
  //     contactList: UpdateContact[],
  //     uuid: string,
  //   ) {
  //     // 기존 메인 전화번호 조회 (Contact 테이블)
  //     const existingContacts = await this.prismaService.contact.findMany({
  //       where: {
  //         contactName: {
  //           some: {
  //             contactNameCategoryMapping: {
  //               some: { contactCategoryId, contactCategory: { userId } },
  //             },
  //           },
  //         },
  //       },
  //       select: { id: true, phoneNumber: true },
  //     });

  //     const existingContactMap = new Map(
  //       existingContacts.map((c) => [c.phoneNumber, c]),
  //     );

  //     // 기존 서브 전화번호가 해당 메인 번호에 `ContactMapping`으로 매핑되어 있는지 확인
  //     const existingMappings = await this.prismaService.contactMapping.findMany({
  //       where: {
  //         mainContactId: { in: existingContacts.map((c) => c.id) },
  //       },
  //       select: {
  //         mainContactId: true,
  //         subContactId: true,
  //         subContact: { select: { phoneNumber: true } },
  //       },
  //     });

  //     const existingSubPhones = existingMappings.reduce(
  //       (map, { mainContactId, subContact }) => {
  //         if (!map.has(mainContactId)) {
  //           map.set(mainContactId, new Set());
  //         }
  //         map.get(mainContactId)?.add(subContact.phoneNumber);
  //         return map;
  //       },
  //       new Map<number, Set<string>>(),
  //     );

  //     const tempData: TempContactData[] = [];

  //     contactList.forEach((contact) => {
  //       const existingMainContact = existingContactMap.get(
  //         contact.mainPhoneNumber,
  //       );

  //       // 메인 전화번호가 DB에 존재하는 경우
  //       if (existingMainContact) {
  //         contact.subPhoneNumberList.forEach((subPhone) => {
  //           const mainContactId = existingMainContact.id;
  //           const subPhoneSet = existingSubPhones.get(mainContactId) || new Set();

  //           // 서브 전화번호가 해당 메인 번호에 이미 `ContactMapping` 테이블을 통해 연결되어 있으면 패스
  //           if (!subPhoneSet.has(subPhone.phoneNumber)) {
  //             // 서브 전화번호가 기존 DB에 없으면 저장
  //             tempData.push({
  //               uuid,
  //               userId,
  //               contactCategoryId: null,
  //               name: null,
  //               note: null,
  //               phoneNumber: subPhone.phoneNumber,
  //               isMain: false,
  //               mainContactId,
  //               tempMainContactId: null,
  //             });
  //           }
  //         });
  //         return;
  //       }

  //       // 메인 전화번호가 없으면 임시 테이블에 저장
  //       tempData.push({
  //         uuid,
  //         userId,
  //         contactCategoryId,
  //         name: contact.name,
  //         note: contact.note,
  //         phoneNumber: contact.mainPhoneNumber,
  //         isMain: true,
  //         mainContactId: null,
  //         tempMainContactId: null,
  //       });

  //       // 서브 전화번호 저장 (메인 번호가 DB에 없어서 `tempMainContactId`로 연결)
  //       contact.subPhoneNumberList.forEach((subPhone) => {
  //         tempData.push({
  //           uuid,
  //           userId,
  //           contactCategoryId: null,
  //           name: null,
  //           note: null,
  //           phoneNumber: subPhone.phoneNumber,
  //           isMain: false,
  //           mainContactId: null,
  //           tempMainContactId: null,
  //         });
  //       });
  //     });

  //     if (tempData.length > 0) {
  //       await this.prismaService.tempContact.createMany({ data: tempData });
  //     }

  //     // DB에 저장된 메인 연락처의 `id` 조회
  //     const savedMainContacts = await this.prismaService.tempContact.findMany({
  //       where: {
  //         isMain: true,
  //         uuid,
  //       },
  //       select: { id: true, uuid: true },
  //     });

  //     // `uuid` 기준으로 `id` 매핑
  //     const mainIdMap = new Map(savedMainContacts.map((mc) => [mc.uuid, mc.id]));

  //     // `tempMainContactId` 업데이트
  //     await this.prismaService.tempContact.updateMany({
  //       where: {
  //         isMain: false,
  //         uuid,
  //       },
  //       data: {
  //         tempMainContactId: mainIdMap.get(uuid) ?? null, // 메인 연락처의 실제 ID로 업데이트
  //       },
  //     });

  //     return {
  //       count: tempData.length,
  //     };
  //   }

  //   createContactListByTempContact(userId: number, uuid: string) {
  //     return this.prismaService.$transaction(async (prisma) => {
  //       // 임시 연락처 데이터 조회
  //       const tempContacts = await prisma.tempContact.findMany({
  //         where: { userId, uuid },
  //         orderBy: { isMain: 'desc' },
  //       });

  //       if (tempContacts.length === 0) {
  //         return { count: 0 };
  //       }

  //       // Contact 테이블에 데이터 삽입 (`RETURNING id`로 ID 가져오기)
  //       const insertedContacts = await prisma.$queryRawUnsafe<
  //         { id: number; phoneNumber: string }[]
  //       >(
  //         `
  //         INSERT INTO "Contact" ("phoneNumber", "isShownInList", "createdAt")
  //         SELECT "phoneNumber", "isMain", EXTRACT(EPOCH FROM NOW()) * 1000
  //         FROM "TempContact"
  //         WHERE "userId" = $1 AND "uuid" = $2
  //         RETURNING id, "phoneNumber"
  //       `,
  //         userId,
  //         uuid,
  //       );

  //       // 생성된 Contact 데이터를 기반으로 TempContact ID → Contact ID 매핑
  //       const contactMap = new Map(
  //         insertedContacts.map((c) => [c.phoneNumber, c.id]),
  //       );

  //       // ContactName 테이블에 데이터 삽입 (isMain = true 인 경우만) + `RETURNING id`
  //       const insertedContactNames = await prisma.$queryRawUnsafe<
  //         { id: number; contactId: number }[]
  //       >(
  //         `
  //         INSERT INTO "ContactName" ("contactId", "name", "isMain", "createdAt")
  //         SELECT c.id, t."name", TRUE, EXTRACT(EPOCH FROM NOW()) * 1000
  //         FROM "TempContact" t
  //         JOIN "Contact" c ON t."phoneNumber" = c."phoneNumber"
  //         WHERE t."userId" = $1 AND t."uuid" = $2 AND t."isMain" = TRUE
  //         RETURNING id, "contactId"
  //       `,
  //         userId,
  //         uuid,
  //       );

  //       // ContactName ID 매핑
  //       const contactNameMap = new Map(
  //         insertedContactNames.map((c) => [c.contactId, c.id]),
  //       );

  //       // ContactNameCategoryMapping 테이블에 데이터 삽입
  //       const contactNameCategoryData = tempContacts
  //         .filter((temp) => temp.isMain && temp.contactCategoryId)
  //         .map((temp) => ({
  //           contactNameId: contactNameMap.get(contactMap.get(temp.phoneNumber)!),
  //           contactCategoryId: temp.contactCategoryId!,
  //         }))
  //         .filter(
  //           (
  //             data,
  //           ): data is { contactNameId: number; contactCategoryId: number } =>
  //             data.contactNameId !== undefined,
  //         );

  //       if (contactNameCategoryData.length > 0) {
  //         await prisma.contactNameCategoryMapping.createMany({
  //           data: contactNameCategoryData,
  //         });
  //       }

  //       // ContactMapping 테이블에 데이터 삽입 (mainContactId 존재하는 경우)
  //       const contactMappingData = tempContacts
  //         .filter((temp) => temp.mainContactId)
  //         .map((temp) => ({
  //           mainContactId: temp.mainContactId!,
  //           subContactId: contactMap.get(temp.phoneNumber),
  //         }))
  //         .filter(
  //           (data): data is { mainContactId: number; subContactId: number } =>
  //             data.subContactId !== undefined,
  //         );

  //       if (contactMappingData.length > 0) {
  //         await prisma.contactMapping.createMany({ data: contactMappingData });
  //       }

  //       // ContactMapping 테이블에 데이터 삽입 (tempMainContactId 존재하는 경우)
  //       const tempMainMappingData = tempContacts
  //         .filter((temp) => temp.tempMainContactId)
  //         .map((temp) => {
  //           const mainContactId = contactMap.get(
  //             tempContacts.find((t) => t.id === temp.tempMainContactId!)
  //               ?.phoneNumber ?? '',
  //           );
  //           const subContactId = contactMap.get(temp.phoneNumber);

  //           return { mainContactId, subContactId };
  //         })
  //         .filter(
  //           (data): data is { mainContactId: number; subContactId: number } =>
  //             data.mainContactId !== undefined && data.subContactId !== undefined,
  //         );

  //       if (tempMainMappingData.length > 0) {
  //         await prisma.contactMapping.createMany({ data: tempMainMappingData });
  //       }

  //       return { count: tempContacts.length };
  //     });
  //   }
}
