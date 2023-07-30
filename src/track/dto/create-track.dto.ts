import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'Name of the track',
  })
  name: string;

  @ApiProperty({
    description: 'Artist',
  })
  artistId: string;

  @ApiProperty({
    description: 'Album',
  })
  albumId: string;

  @ApiProperty({
    description: 'Duration of the track',
  })
  duration: number;
}
