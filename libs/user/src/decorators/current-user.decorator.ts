import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserDTO } from '@app/user/dto/user';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDTO => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const request = gqlCtx.getContext().req;

    return request.user;
  },
);
