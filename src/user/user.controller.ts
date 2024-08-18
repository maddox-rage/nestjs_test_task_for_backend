import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { AuthResponseDto } from 'src/auth/auth.dto';
import { User } from '@prisma/client';
import { SignUpOrSignInPipe } from './pipes/signUpOrSignIn.pipe';
import { UpdateUserEmailPipe } from './pipes/updateUserEmail.pipe';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(
    @Param('id', ParseIdPipe) userId: number,
  ): Promise<User | null> {
    return this.userService.getUserById(userId);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(SignUpOrSignInPipe)
  async signUpOrSignIn(@Body() userData: UserDto): Promise<AuthResponseDto> {
    return this.userService.signUpOrSignIn(userData);
  }

  @Put(':id')
  @UsePipes(UpdateUserEmailPipe)
  async updateUserEmail(
    @Param('id', ParseIdPipe) userId: number,
    @Body('email') newEmail: string,
  ): Promise<User> {
    return this.userService.updateUserEmail(userId, newEmail);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIdPipe) userId: number): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
