import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
// import tracksDB from 'src/databases/tracksDB';
import { ITrack } from 'src/interfaces/ITrack';
import { v4 } from 'uuid';
import uuidValidate from 'src/utils/uuidValidate';
// import findRecordLegacy from 'src/utils/findRecordLegacy';
// import favoritesDB from 'src/databases/favoritesDB';
import { PrismaService } from 'src/prisma.service';
import findRecord from 'src/utils/findRecord';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async getTracks() {
    return await this.prisma.tracks.findMany();
  }

  async postTrack({ name, artistId, albumId, duration }: CreateTrackDto) {
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
    return await this.prisma.tracks.create({
      data: newTrack,
    });
  }

  async getTrack(trackId: string) {
    uuidValidate(trackId);
    return await findRecord(this.prisma, trackId, 'tracks');
  }

  async putTrack(
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
    await findRecord(this.prisma, trackId, 'tracks');
    return await this.prisma.tracks.update({
      where: {
        id: trackId,
      },
      data: {
        name,
        artistId: artistId ?? null,
        albumId: albumId ?? null,
        duration,
      },
    });
  }

  async deleteTrack(trackId: string) {
    uuidValidate(trackId);
    await findRecord(this.prisma, trackId, 'tracks');
    await this.prisma.tracks.delete({
      where: {
        id: trackId,
      },
    });
    // const trackFavsIndex = favoritesDB.tracks.indexOf(track as ITrack);
    // favoritesDB.tracks.splice(trackFavsIndex, 1);
  }
}
