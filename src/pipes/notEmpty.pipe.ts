import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NotEmptyPipe implements PipeTransform {
  transform(value: any) {
    if (typeof value !== 'object' || value === null) {
      throw new BadRequestException('Invalid data');
    }

    if (Object.keys(value).length === 0) {
      throw new BadRequestException('Body cannot be empty');
    }

    for (const [key, val] of Object.entries(value)) {
      if (val === '' || val === null || val === undefined) {
        throw new BadRequestException(`${key} cannot be empty`);
      }
    }

    return value;
  }
}
