import { User } from '@prisma/client';
import { UserDto } from './user.dto';

export function toUserDto(user: User): UserDto {
  const { password, ...rest } = user;
  return rest;
}
