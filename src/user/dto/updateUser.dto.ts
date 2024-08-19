import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email address of update the user',
    example: 'user@example.com',
    required: true,
  })
  @IsEmail()
  email: string;
}
