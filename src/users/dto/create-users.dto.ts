import { ApiProperty } from '@nestjs/swagger';

export class CreateUsersDto {
  @ApiProperty({
    description: "The user's login",
  })
  login: string;

  @ApiProperty({
    description: "The user's password",
  })
  password: string;
}
