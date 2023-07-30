import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import artistsDB from 'src/databases/artistsDB';
import { v4 } from 'uuid';
import { IArtist } from 'src/interfaces/IArtist';
import findArtist from 'src/utils/findArtist';
import uuidValidate from 'src/utils/uuidValidate';

@Injectable()
export class ArtistService {
  getArtists() {
    return artistsDB;
  }

  postArtist({ name, grammy }: CreateArtistDto) {
    if (!(name && grammy !== undefined)) {
      throw new Error('400');
    }
    const newArtist: IArtist = {
      id: v4(),
      name,
      grammy,
    };
    artistsDB.push(newArtist);
    return newArtist;
  }

  getArtist(artistId: string) {
    uuidValidate(artistId);
    const artist = findArtist(artistId);
    return artist;
  }

  putArtist(artistId: string, { name, grammy }: UpdateArtistDto) {
    uuidValidate(artistId);
    if (
      !(
        name &&
        grammy !== undefined &&
        typeof name === 'string' &&
        typeof grammy === 'boolean'
      )
    ) {
      throw new Error('400');
    }
    const artist = findArtist(artistId);
    artist.name = name;
    artist.grammy = grammy;
    return artist;
  }

  deleteArtist(artistId: string) {
    uuidValidate(artistId);
    const artist = findArtist(artistId);
    const artistIndex = artistsDB.indexOf(artist);
    artistsDB.splice(artistIndex, 1);
  }
}
