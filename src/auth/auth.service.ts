import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private readonly JwtService: JwtService) {}

  async generateToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return { token: this.JwtService.sign(payload) };
  }
}
