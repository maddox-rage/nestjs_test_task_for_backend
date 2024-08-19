import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCardDto {
  @ApiProperty({
    description: 'Title fot update the card',
    example: 'This is a sample text.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
