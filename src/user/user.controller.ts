import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthResponseDto } from 'src/auth/auth.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id') userId: number): Promise<User | null> {
    return this.userService.getUserById(Number(userId));
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async signUpOrSignIn(@Body() userData: UserDto): Promise<AuthResponseDto> {
    return this.userService.signUpOrSignIn(userData);
  }

  @Put(':id')
  async updateUserEmail(
    @Param('id') userId: number,
    @Body('email') newEmail: string,
  ): Promise<User> {
    return this.userService.updateUserEmail(Number(userId), newEmail);
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<User> {
    return this.userService.deleteUser(Number(userId));
  }
}
