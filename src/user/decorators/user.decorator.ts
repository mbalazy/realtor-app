import { createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator((data, ctx) => {
  console.log(ctx);
  return {
    id: 2,
    name: 'Mart',
    phone: 'ss',
  };
});
