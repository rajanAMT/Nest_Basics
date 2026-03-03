import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Rajan',
    description: 'Name of the user',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}
