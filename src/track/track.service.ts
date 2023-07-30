import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import tracksDB from 'src/databases/tracksDB';
import { ITrack } from 'src/interfaces/ITrack';
import { v4 } from 'uuid';
import uuidValidate from 'src/utils/uuidValidate';
import findTrack from 'src/utils/findTrack';

@Injectable()
export class TrackService {
  getTracks() {
    return tracksDB;
  }

  postTrack({ name, artistId, albumId, duration }: CreateTrackDto) {
    if (!(name && duration !== undefined)) {
      throw new Error('400');
    }
    const newTrack: ITrack = {
      id: v4(),
      name,
      artistId: artistId ?? null,
      albumId: albumId ?? null,
      duration,
    };
    tracksDB.push(newTrack);
    return newTrack;
  }

  getTrack(trackId: string) {
    uuidValidate(trackId);
    const track = findTrack(trackId);
    return track;
  }

  putTrack(
    trackId: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ) {
    uuidValidate(trackId);
    if (
      !(
        name &&
        duration !== undefined &&
        typeof name === 'string' &&
        typeof duration === 'number'
      )
    ) {
      throw new Error('400');
    }
    const album = findTrack(trackId);
    album.name = name;
    album.artistId = artistId ?? null;
    album.albumId = albumId ?? null;
    album.duration = duration;
    return album;
  }

  deleteTrack(trackId: string) {
    uuidValidate(trackId);
    const track = findTrack(trackId);
    const trackIndex = tracksDB.indexOf(track);
    tracksDB.splice(trackIndex, 1);
  }
}
