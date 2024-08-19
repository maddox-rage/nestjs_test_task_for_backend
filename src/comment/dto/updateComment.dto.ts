import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Text for update the comment',
    example: 'This is a sample comment.',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}
