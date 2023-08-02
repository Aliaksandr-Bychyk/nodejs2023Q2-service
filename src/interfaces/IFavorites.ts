import { IAlbum } from './IAlbum';
import { IArtist } from './IArtist';
import { ITrack } from './ITrack';

export interface IFavorites {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
