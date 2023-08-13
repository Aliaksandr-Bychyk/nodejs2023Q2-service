import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import artistsDB from 'src/databases/artistsDB';
import { v4 } from 'uuid';
import { IArtist } from 'src/interfaces/IArtist';
import uuidValidate from 'src/utils/uuidValidate';
import findRecordLegacy from 'src/utils/findRecordLegacy';
import albumsDB from 'src/databases/albumsDB';
import tracksDB from 'src/databases/tracksDB';
import favoritesDB from 'src/databases/favoritesDB';

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
    const artist = findRecordLegacy(artistsDB, artistId);
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
    const artist = findRecordLegacy(artistsDB, artistId);
    (artist as IArtist).name = name;
    (artist as IArtist).grammy = grammy;
    return artist;
  }

  deleteArtist(artistId: string) {
    uuidValidate(artistId);
    const artist = findRecordLegacy(artistsDB, artistId);
    const artistIndex = artistsDB.indexOf(artist as IArtist);
    artistsDB.splice(artistIndex, 1);
    const album = albumsDB.find((album) => album.artistId === artistId);
    if (album) {
      album.artistId = null;
    }
    const track = tracksDB.find((track) => track.artistId === artistId);
    if (track) {
      track.artistId = null;
    }
    const artistFavsIndex = favoritesDB.artists.indexOf(artist as IArtist);
    favoritesDB.artists.splice(artistFavsIndex, 1);
  }
}
