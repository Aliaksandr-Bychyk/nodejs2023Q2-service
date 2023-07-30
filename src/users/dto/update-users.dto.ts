import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUsersDto } from './create-users.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @ApiProperty({
    description: "The user's password",
  })
  oldPassword: string;

  @ApiProperty({
    description: "The user's password",
  })
  newPassword: string;
}
