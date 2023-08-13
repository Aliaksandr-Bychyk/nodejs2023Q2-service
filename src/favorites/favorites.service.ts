import { Injectable } from '@nestjs/common';
import albumsDB from 'src/databases/albumsDB';
import artistsDB from 'src/databases/artistsDB';
import favoritesDB from 'src/databases/favoritesDB';
import tracksDB from 'src/databases/tracksDB';
import { IDatabase } from 'src/interfaces/IDatabase';
import findRecordLegacy from 'src/utils/findRecordLegacy';
import uuidValidate from 'src/utils/uuidValidate';

@Injectable()
export class FavoritesService {
  getFavorites() {
    return favoritesDB;
  }

  postFavoritesTrack(trackId: string) {
    this.postFavorites(trackId, tracksDB, 'tracks');
  }

  deleteFavoritesTrack(trackId: string) {
    this.deleteFavorites(trackId, 'tracks');
  }

  postFavoritesAlbum(albumId: string) {
    this.postFavorites(albumId, albumsDB, 'albums');
  }

  deleteFavoritesAlbum(albumId: string) {
    this.deleteFavorites(albumId, 'albums');
  }

  postFavoritesArtist(artistId: string) {
    this.postFavorites(artistId, artistsDB, 'artists');
  }

  deleteFavoritesArtist(artistId: string) {
    this.deleteFavorites(artistId, 'artists');
  }

  postFavorites(id: string, database: IDatabase[], type: string) {
    uuidValidate(id);
    const record = findRecordLegacy(database, id, '422');
    favoritesDB[type].push(record);
  }

  deleteFavorites(id: string, type: string) {
    uuidValidate(id);
    const record = findRecordLegacy(favoritesDB[type], id);
    const recordIndex = favoritesDB[type].indexOf(record);
    favoritesDB[type].splice(recordIndex, 1);
  }
}
