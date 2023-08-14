import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsesMessages } from 'src/interfaces/ResponsesMessages';
import exceptionHandler from 'src/utils/exceptionHandler';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('Track') },
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
      return await this.trackService.getTracks();
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
              },
              trackId: {
                type: 'string',
                format: 'uuid',
              },
              duration: {
                type: 'integer',
                description: 'In seconds',
              },
            },
            required: ['name', 'duration'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Track'),
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
  async postAlbum(@Body() createTrackDto: CreateTrackDto) {
    try {
      return await this.trackService.postTrack(createTrackDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Get(':trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Track'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(200)
  async getAlbum(@Param('trackId') trackId: string) {
    try {
      return await this.trackService.getTrack(trackId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Put(':trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
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
                example: 'Bohemian Rhapsody',
              },
              artistId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
              duration: {
                type: 'integer',
                description: 'In seconds',
                example: 355,
              },
              albumId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
              },
            },
            required: ['name', 'duration'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The track has been updated.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'example',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
              example: 'Bohemian Rhapsody',
            },
            artistId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
            },
            duration: {
              type: 'integer',
              description: 'In seconds',
              example: 355,
            },
            albumId: {
              type: 'string',
              format: 'uuid',
              nullable: true,
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(200)
  async putAlbum(
    @Param('trackId') trackId: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return await this.trackService.putTrack(trackId, updateTrackDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete(':trackId')
  @ApiParam({ name: 'trackId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(204)
  async deleteAlbum(@Param('trackId') trackId: string) {
    try {
      return await this.trackService.deleteTrack(trackId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }
}
