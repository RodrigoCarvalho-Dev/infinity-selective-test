import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

class RegisterDto {

  @ApiProperty({
    example: 'email',
    description: 'email do usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'senha do usuario',
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'username',
    description: 'username do usuario',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'full_name',
    description: 'nome completo do usuario',
  })
  @IsString()
  full_name: string;
}

export { RegisterDto };
