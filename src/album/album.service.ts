import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import albumsDB from 'src/databases/albumsDB';
import { IAlbum } from 'src/interfaces/IAlbum';
import { v4 } from 'uuid';
import uuidValidate from 'src/utils/uuidValidate';
import findRecord from 'src/utils/findRecord';

@Injectable()
export class AlbumService {
  getAlbums() {
    return albumsDB;
  }

  postAlbum({ name, year, artistId }: CreateAlbumDto) {
    if (!(name && year !== undefined)) {
      throw new Error('400');
    }
    const newAlbum: IAlbum = {
      id: v4(),
      name,
      year,
      artistId: artistId ?? null,
    };
    albumsDB.push(newAlbum);
    return newAlbum;
  }

  getAlbum(albumId: string) {
    uuidValidate(albumId);
    const album = findRecord(albumsDB, albumId);
    return album;
  }

  putAlbum(albumId: string, { name, year, artistId }: UpdateAlbumDto) {
    uuidValidate(albumId);
    if (
      !(
        name &&
        year !== undefined &&
        typeof name === 'string' &&
        typeof year === 'number'
      )
    ) {
      throw new Error('400');
    }
    const album = findRecord(albumsDB, albumId);
    (album as IAlbum).name = name;
    (album as IAlbum).year = year;
    (album as IAlbum).artistId = artistId ?? null;
    return album;
  }

  deleteAlbum(albumId: string) {
    uuidValidate(albumId);
    const album = findRecord(albumsDB, albumId);
    const albumIndex = albumsDB.indexOf(album as IAlbum);
    albumsDB.splice(albumIndex, 1);
  }
}
