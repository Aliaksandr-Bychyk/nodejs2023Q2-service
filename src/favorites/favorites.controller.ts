import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsesMessages } from 'src/interfaces/ResponsesMessages';
import exceptionHandler from 'src/utils/exceptionHandler';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('Favorites') },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @HttpCode(200)
  getFavorites() {
    try {
      return this.favoritesService.getFavorites();
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post('/track/:trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 422,
    description: "Track with id doesn't exist.",
  })
  @HttpCode(201)
  postFavoritesTrack(@Param('trackId') trackId: string) {
    try {
      return this.favoritesService.postFavoritesTrack(trackId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete('/track/:trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found',
  })
  @HttpCode(204)
  deleteFavoritesTrack(@Param('trackId') trackId: string) {
    try {
      return this.favoritesService.deleteFavoritesTrack(trackId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post('/album/:albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 422,
    description: "Album with id doesn't exist.",
  })
  @HttpCode(201)
  postFavoritesAlbum(@Param('albumId') albumId: string) {
    try {
      return this.favoritesService.postFavoritesAlbum(albumId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete('/album/:albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found',
  })
  @HttpCode(204)
  deleteFavoritesAlbum(@Param('albumId') albumId: string) {
    try {
      return this.favoritesService.deleteFavoritesAlbum(albumId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post('/artist/:artistId')
  @ApiParam({ name: 'artistId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiResponse({
    status: 201,
    description: 'Added successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 422,
    description: "Artist with id doesn't exist.",
  })
  @HttpCode(201)
  postFavoritesArtist(@Param('artistId') artistId: string) {
    try {
      return this.favoritesService.postFavoritesArtist(artistId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete('/artist/:artistId')
  @ApiParam({ name: 'artistId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Artist was not found',
  })
  @HttpCode(204)
  deleteFavoritesArtist(@Param('artistId') artistId: string) {
    try {
      return this.favoritesService.deleteFavoritesArtist(artistId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }
}
