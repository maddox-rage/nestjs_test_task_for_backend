import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async signUpOrSignIn(dto: UserDto): Promise<{ user: User; token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (existingUser) {
      const isMatch = await bcrypt.compare(dto.password, existingUser.password);
      if (!isMatch) {
        throw new Error('Invalid email or password!');
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
}
