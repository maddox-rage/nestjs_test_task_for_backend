import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Title of the card',
    example: 'This is a sample text.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
