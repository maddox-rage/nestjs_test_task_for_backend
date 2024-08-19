import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateColumnDto {
  @ApiProperty({
    description: 'Title for update the column',
    example: 'This is a sample text.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;
}
