import { PartialBy } from '@common/util/type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiOperation,
  ApiResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger';

export type ApiDocsArgs = PartialBy<
  Pick<Required<ApiResponseMetadata>, 'status' | 'description' | 'type'>,
  'type'
>;

export default function ApiDocsGenerator({
  apiDescription,
  statusArgs,
  body,
}: {
  apiDescription: string;
  statusArgs: ApiDocsArgs[];
  body?: ApiBodyOptions;
}) {
  const decoratorList: MethodDecorator[] = [];

  decoratorList.push(
    ApiOperation({
      description: apiDescription,
    }),
  );

  if (body) {
    decoratorList.push(ApiBody(body));
  }

  statusArgs.forEach((statusArg) => {
    decoratorList.push(
      ApiResponse({
        status: statusArg.status,
        description: statusArg.description,
        type: statusArg.type,
      }),
    );
  });

  return applyDecorators(...decoratorList);
}
