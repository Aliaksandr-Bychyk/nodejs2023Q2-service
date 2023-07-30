import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsersDto {
  @ApiProperty({
    description: "The user's password",
  })
  oldPassword: string;

  @ApiProperty({
    description: "The user's password",
  })
  newPassword: string;
}
