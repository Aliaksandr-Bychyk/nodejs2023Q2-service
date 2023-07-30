import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    description: "The artist's name",
  })
  name: string;

  @ApiProperty({
    description: 'Has the artist grammy',
  })
  grammy: boolean;
}
