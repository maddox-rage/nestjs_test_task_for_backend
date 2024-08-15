import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthResponseDto } from 'src/auth/auth.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async users(@Body() userData: UserDto): Promise<AuthResponseDto> {
    return this.userService.signUpOrSignIn(userData);
  }
}
