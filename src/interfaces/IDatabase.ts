import { IAlbum } from './IAlbum';
import { IArtist } from './IArtist';
import { ITrack } from './ITrack';
import { IUser } from './IUser';

export type IDatabase = IAlbum | IArtist | ITrack | IUser;
