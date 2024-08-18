import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import * as validator from 'validator';

@Injectable()
export class UpdateUserEmailPipe implements PipeTransform {
  transform(value: any) {
    const email = value;

    if (!validator.isEmail(email)) {
      throw new BadRequestException('Invalid email format');
    }

    return value;
  }
}
