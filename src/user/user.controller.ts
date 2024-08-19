import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/signUpOrSignIn.dto';
import { AuthResponseDto } from 'src/auth/auth.dto';
import { User } from '@prisma/client';
import { SignUpOrSignInPipe } from './pipes/signUpOrSignIn.pipe';
import { UpdateUserEmailPipe } from './pipes/updateUserEmail.pipe';
import { ParseIdPipe } from 'src/pipes/parseId.pipe';
import { AdminGuard } from 'src/guards/admin.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(
    @Param('id', ParseIdPipe) userId: number,
  ): Promise<User | null> {
    return this.userService.getUserById(userId);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  @UsePipes(
    SignUpOrSignInPipe,
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @ApiOperation({ summary: 'Sign up or sign in a user' })
  @ApiResponse({
    status: 201,
    description: 'User signed up or signed in',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signUpOrSignIn(
    @Body() userData: CreateUserDto,
  ): Promise<AuthResponseDto> {
    return this.userService.signUpOrSignIn(userData);
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UsePipes(
    UpdateUserEmailPipe,
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user email' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User email updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUserEmail(
    @Param('id', ParseIdPipe) userId: number,
    @Body() newEmail: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserEmail(userId, newEmail);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id', ParseIdPipe) userId: number): Promise<User> {
    return this.userService.deleteUser(userId);
  }
}
