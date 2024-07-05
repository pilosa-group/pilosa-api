import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatorDto } from '@app/api/paginator.dto';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';

export const ApiPaginatedResponse = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  options: Omit<ApiResponseOptions, 'schema'> = {},
) =>
  applyDecorators(
    ApiExtraModels(PaginatorDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatorDto) },
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
      ...options,
    }),
  );
