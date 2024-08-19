import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @ApiProperty({
    description: 'Title of the column',
    example: 'This is a sample text.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
