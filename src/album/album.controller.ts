import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsesMessages } from 'src/interfaces/ResponsesMessages';
import exceptionHandler from 'src/utils/exceptionHandler';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('Album') },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @HttpCode(200)
  async getAlbums() {
    try {
      return await this.albumService.getAlbums();
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              name: {
                type: 'string',
              },
              year: {
                type: 'integer',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
            },
            required: ['name', 'year'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Album is created',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Album'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields.',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @HttpCode(201)
  async postAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumService.postAlbum(createAlbumDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Get(':albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Album'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(200)
  async getAlbum(@Param('albumId') albumId: string) {
    try {
      return await this.albumService.getAlbum(albumId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Put(':albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              name: {
                type: 'string',
              },
              year: {
                type: 'integer',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
            },
            required: ['name', 'year'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The album has been updated.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath('Album') },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(200)
  async putAlbum(
    @Param('albumId') albumId: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumService.putAlbum(albumId, updateAlbumDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete(':albumId')
  @ApiParam({ name: 'albumId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(204)
  async deleteAlbum(@Param('albumId') albumId: string) {
    try {
      return await this.albumService.deleteAlbum(albumId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }
}
