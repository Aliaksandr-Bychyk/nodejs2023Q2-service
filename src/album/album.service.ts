import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from 'src/interfaces/IAlbum';
import { v4 } from 'uuid';
import uuidValidate from 'src/utils/uuidValidate';
import { PrismaService } from 'src/prisma.service';
import findRecord from 'src/utils/findRecord';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums() {
    return await this.prisma.albums.findMany();
  }

  async postAlbum({ name, year, artistId }: CreateAlbumDto) {
    if (!(name && year !== undefined)) {
      throw new Error('400');
    }
    const newAlbum: IAlbum = {
      id: v4(),
      name,
      year,
      artistId: artistId ?? null,
    };
    return await this.prisma.albums.create({
      data: newAlbum,
    });
  }

  async getAlbum(albumId: string) {
    uuidValidate(albumId);
    return await findRecord(this.prisma, albumId, 'albums');
  }

  async putAlbum(albumId: string, { name, year, artistId }: UpdateAlbumDto) {
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
    await findRecord(this.prisma, albumId, 'albums');
    return await this.prisma.albums.update({
      where: {
        id: albumId,
      },
      data: {
        name,
        year,
        artistId: artistId ?? null,
      },
    });
  }

  async deleteAlbum(albumId: string) {
    uuidValidate(albumId);
    await findRecord(this.prisma, albumId, 'albums');
    await this.prisma.albums.delete({
      where: {
        id: albumId,
      },
    });
    this.prisma.favoriteAlbums.delete({
      where: {
        albumId,
      },
    });
  }
}
