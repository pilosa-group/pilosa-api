import { PaginatorDto } from '@app/api/paginator.dto';
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
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
                items: { $ref: getSchemaPath(dataDto) },
                type: 'array',
              },
            },
          },
        ],
      },
      ...options,
    }),
  );
