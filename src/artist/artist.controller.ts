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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponsesMessages } from 'src/interfaces/ResponsesMessages';
import exceptionHandler from 'src/utils/exceptionHandler';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('Artist') },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @HttpCode(200)
  getArtists() {
    try {
      return this.artistService.getArtists();
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
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
              grammy: {
                type: 'boolean',
              },
            },
            required: ['name', 'grammy'],
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
          $ref: getSchemaPath('Artist'),
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
  postArtist(@Body() createArtistDto: CreateArtistDto) {
    try {
      return this.artistService.postArtist(createArtistDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Get(':artistId')
  @ApiParam({ name: 'artistId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Get single artist by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('Artist'),
        },
      },
    },
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
    description: 'Artist was not found.',
  })
  @HttpCode(200)
  getArtist(@Param('artistId') artistId: string) {
    try {
      return this.artistService.getArtist(artistId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Put(':artistId')
  @ApiParam({ name: 'artistId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
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
              grammy: {
                type: 'boolean',
              },
            },
            required: ['string', 'boolean'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The artist has been updated.',
    content: {
      'application/json': {
        schema: { $ref: getSchemaPath('Artist') },
      },
    },
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
    description: 'Artist was not found.',
  })
  @HttpCode(200)
  putArtist(
    @Param('artistId') artistId: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return this.artistService.putArtist(artistId, updateArtistDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete(':artistId')
  @ApiParam({ name: 'artistId', type: 'string', format: 'uuid' })
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
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
    description: 'Artist was not found.',
  })
  @HttpCode(204)
  deleteArtist(@Param('artistId') artistId: string) {
    try {
      return this.artistService.deleteArtist(artistId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }
}
