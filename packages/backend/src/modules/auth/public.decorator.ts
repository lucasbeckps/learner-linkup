import { SetMetadata } from '@nestjs/common';
import { jwtConstants } from '@backend/modules/auth/constants';

export const IS_PUBLIC_KEY = jwtConstants.bypassKey;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
