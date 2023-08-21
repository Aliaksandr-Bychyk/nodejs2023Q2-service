import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "The user's login",
  })
  login: string;

  @ApiProperty({
    description: "The user's password",
  })
  password: string;
}
