import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { toUserDto } from './user.mapper';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.prismaService.user.findMany();
    return users.map((user) => toUserDto(user));
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    return toUserDto(user);
  }
}
