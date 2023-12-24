import { User } from '@prisma/client';

export type UserDto = Omit<User, 'password'>;

export type CreateUserDto = Pick<User, 'name' | 'email' | 'password'>;
