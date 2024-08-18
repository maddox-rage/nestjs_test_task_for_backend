import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: any) {
    const id = Number(value);

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException(
        'Invalid ID. It must be a positive number.',
      );
    }

    return id;
  }
}
