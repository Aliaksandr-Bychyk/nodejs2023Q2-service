import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import artistsDB from 'src/databases/artistsDB';
import { v4 } from 'uuid';
import { IArtist } from 'src/interfaces/IArtist';
import uuidValidate from 'src/utils/uuidValidate';
import findRecord from 'src/utils/findRecord';

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
    const artist = findRecord(artistsDB, artistId);
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
    const artist = findRecord(artistsDB, artistId);
    (artist as IArtist).name = name;
    (artist as IArtist).grammy = grammy;
    return artist;
  }

  deleteArtist(artistId: string) {
    uuidValidate(artistId);
    const artist = findRecord(artistsDB, artistId);
    const artistIndex = artistsDB.indexOf(artist as IArtist);
    artistsDB.splice(artistIndex, 1);
  }
}
