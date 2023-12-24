import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { toUserDto } from './user.mapper';
import { CreateUserDto, UserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prismaService.user.create({
      data: { ...createUserDto, password },
    });
    return toUserDto(user);
  }

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
