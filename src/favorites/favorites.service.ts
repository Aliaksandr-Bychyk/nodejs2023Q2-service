import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import findRecord from 'src/utils/findRecord';
import uuidValidate from 'src/utils/uuidValidate';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites() {
    return {
      artists: (
        await this.prisma.favoriteArtists.findMany({
          select: {
            artists: true,
          },
        })
      ).map((artist) => artist.artists),
      albums: (
        await this.prisma.favoriteAlbums.findMany({
          select: {
            albums: true,
          },
        })
      ).map((album) => album.albums),
      tracks: (
        await this.prisma.favoriteTracks.findMany({
          select: {
            tracks: true,
          },
        })
      ).map((track) => track.tracks),
    };
  }

  async postFavoritesTrack(trackId: string) {
    await this.postFavorites(trackId, this.prisma, 'tracks', 'favoriteTracks');
  }

  async deleteFavoritesTrack(trackId: string) {
    await this.deleteFavorites(
      trackId,
      this.prisma,
      'tracks',
      'favoriteTracks',
    );
  }

  async postFavoritesAlbum(albumId: string) {
    await this.postFavorites(albumId, this.prisma, 'albums', 'favoriteAlbums');
  }

  async deleteFavoritesAlbum(albumId: string) {
    await this.deleteFavorites(
      albumId,
      this.prisma,
      'albums',
      'favoriteAlbums',
    );
  }

  async postFavoritesArtist(artistId: string) {
    await this.postFavorites(
      artistId,
      this.prisma,
      'artists',
      'favoriteArtists',
    );
  }

  async deleteFavoritesArtist(artistId: string) {
    await this.deleteFavorites(
      artistId,
      this.prisma,
      'artists',
      'favoriteArtists',
    );
  }

  async postFavorites(
    id: string,
    prisma: PrismaService,
    model: string,
    type: string,
  ) {
    uuidValidate(id);
    const record = await findRecord(prisma, id, model);
    const nameId = [
      ['tracks', 'tracksId'],
      ['artists', 'artistsId'],
      ['albums', 'albumsId'],
    ].find((el) => el[0] === model)[1];
    await prisma[type].create({
      data: {
        [nameId]: record.id,
      },
    });
  }

  async deleteFavorites(
    id: string,
    prisma: PrismaService,
    model: string,
    type: string,
  ) {
    uuidValidate(id);
    await findRecord(prisma, id, model);
    const nameId = [
      ['tracks', 'tracksId'],
      ['artists', 'artistsId'],
      ['albums', 'albumsId'],
    ].find((el) => el[0] === model)[1];
    await prisma[type].delete({
      where: {
        [nameId]: id,
      },
    });
  }
}
