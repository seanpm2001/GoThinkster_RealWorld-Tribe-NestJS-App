import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/user.dto';
import * as bcrypt from 'bcrypt';
import { toUserDto } from '../user/user.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prismaService.user.create({
      data: { ...createUserDto, password },
    });
    return toUserDto(user);
  }

  async login(data: LoginUserDto): Promise<UserDto> {
    console.log({ data });
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    return toUserDto(user);
  }
}
