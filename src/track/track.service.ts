import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import tracksDB from 'src/databases/tracksDB';
import { ITrack } from 'src/interfaces/ITrack';
import { v4 } from 'uuid';
import uuidValidate from 'src/utils/uuidValidate';
import findRecordLegacy from 'src/utils/findRecordLegacy';
import favoritesDB from 'src/databases/favoritesDB';

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
    const track = findRecordLegacy(tracksDB, trackId);
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
    const track = findRecordLegacy(tracksDB, trackId);
    (track as ITrack).name = name;
    (track as ITrack).artistId = artistId ?? null;
    (track as ITrack).albumId = albumId ?? null;
    (track as ITrack).duration = duration;
    return track;
  }

  deleteTrack(trackId: string) {
    uuidValidate(trackId);
    const track = findRecordLegacy(tracksDB, trackId);
    const trackIndex = tracksDB.indexOf(track as ITrack);
    tracksDB.splice(trackIndex, 1);
    const trackFavsIndex = favoritesDB.tracks.indexOf(track as ITrack);
    favoritesDB.tracks.splice(trackFavsIndex, 1);
  }
}
