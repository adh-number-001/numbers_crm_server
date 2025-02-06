import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });

    // 모든 테이블의 createdAt 자동 설정 (UNIX Timestamp)
    this.$use((params: Prisma.MiddlewareParams, next) => {
      if (params.action === 'create' || params.action === 'createMany') {
        const args = { ...params.args };

        if (args.data) {
          // 단일 데이터 처리
          if (!args.data.createdAt) {
            args.data.createdAt = BigInt(Date.now());
          }

          // createMany의 경우 배열 처리
          if (Array.isArray(args.data)) {
            args.data = args.data.map((item: { createdAt: bigint }) => ({
              ...item,
              createdAt: item.createdAt ?? BigInt(Date.now()),
            }));
          }
        }

        return next({ ...params, args });
      }

      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
