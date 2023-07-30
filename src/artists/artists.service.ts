import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import artistsDB from 'src/databases/artistsDB';
import { v4 } from 'uuid';
import { IArtist } from 'src/interfaces/IArtist';
import findArtist from 'src/utils/findArtist';
import uuidValidate from 'src/utils/uuidValidate';

@Injectable()
export class ArtistsService {
  getArtists() {
    return artistsDB;
  }

  postArtists({ name, grammy }: CreateArtistDto) {
    console.log(name, grammy);
    if (!(name && grammy !== undefined)) {
      throw new Error('400');
    }
    const newArtist: IArtist = {
      id: v4(),
      name,
      grammy,
    };
    artistsDB.push(newArtist);
    return {
      id: newArtist.id,
      name: newArtist.name,
      grammy: newArtist.grammy,
    };
  }

  getArtist(id: string) {
    uuidValidate(id);
    const artist = findArtist(id);
    return artist;
  }

  putArtist(id: string, { name, grammy }: UpdateArtistDto) {
    uuidValidate(id);
    const artist = findArtist(id);
    artist.name = name ? name : artist.name;
    artist.grammy = grammy ? grammy : artist.grammy;
    return artist;
  }

  deleteArtist(id: string) {
    uuidValidate(id);
    const artist = findArtist(id);
    const artistIndex = artistsDB.indexOf(artist);
    artistsDB.splice(artistIndex, 1);
  }
}
