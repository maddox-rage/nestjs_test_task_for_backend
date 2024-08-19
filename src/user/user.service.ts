import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/signUpOrSignIn.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async signUpOrSignIn(
    dto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      const isMatch = await bcrypt.compare(dto.password, existingUser.password);
      if (!isMatch) {
        throw new HttpException(
          'Invalid email or password!',
          HttpStatus.BAD_REQUEST,
        );
      }
      const token = await this.authService.generateToken(existingUser);
      return { user: existingUser, ...token };
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
    const token = await this.authService.generateToken(newUser);
    return { user: newUser, ...token };
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    if (!users || users.length === 0) {
      throw new NotFoundException('Users not Found');
    }
    return users;
  }

  async updateUserEmail(id: number, newEmail: UpdateUserDto): Promise<User> {
    await this.getUserById(id);
    return await this.prisma.user.update({
      where: { id },
      data: {
        email: newEmail.email,
      },
    });
  }

  async deleteUser(id: number): Promise<User> {
    await this.getUserById(id);
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
