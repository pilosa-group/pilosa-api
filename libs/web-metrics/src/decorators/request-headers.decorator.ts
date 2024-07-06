import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const RequestHeaders = createParamDecorator(
  (property: number | string | symbol, ctx: ExecutionContext) => {
    const headers = ctx.switchToHttp().getRequest().headers;

    if (
      typeof property === 'string' ||
      typeof property === 'number' ||
      typeof property === 'symbol'
    ) {
      return headers[property];
    }

    return headers;
  },
);
