import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AuthController],
  providers: [UserService, PrismaService],
})
export class AuthModule {}
