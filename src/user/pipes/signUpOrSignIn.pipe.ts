import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as validator from 'validator';

@Injectable()
export class SignUpOrSignInPipe implements PipeTransform {
  transform(value: any) {
    const { email, password } = value;

    if (!validator.isEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    if (typeof password !== 'string' || password.length < 6) {
      throw new BadRequestException(
        'Password must be at least 6 characters long',
      );
    }

    return value;
  }
}
