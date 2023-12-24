import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  login(@Body() data: LoginUserDto): Promise<UserDto> {
    return this.authService.login(data);
  }
}
