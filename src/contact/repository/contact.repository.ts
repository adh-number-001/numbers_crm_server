import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';

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
}
