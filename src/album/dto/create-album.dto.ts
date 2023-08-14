import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Name of the album',
  })
  name: string;

  @ApiProperty({
    description: 'Year of release',
  })
  year: number;

  @ApiProperty({
    description: 'Artist',
  })
  artistId: string;
}
