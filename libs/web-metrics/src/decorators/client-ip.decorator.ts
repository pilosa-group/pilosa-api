import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return (
      (request.headers['x-forwarded-for'] || '').split(',')[0] || request.ip
    );
  },
);
