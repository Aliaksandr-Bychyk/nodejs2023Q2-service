import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: { $ref: getSchemaPath('User') },
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  getUsers() {
    // return [];
    return this.usersService.getUsers();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields.',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid.',
  })
  postUsers(@Body() createUsersDto: CreateUsersDto) {
    return [];
  }

  @Get('{userId}')
  getUser(@Param('userId') userId: string) {
    return { userId };
  }

  @Put('{userId}')
  putUser(@Param('userId') userId: string) {
    return { userId };
  }

  @Delete('{userId}')
  deleteUser(@Param('userId') userId: string) {
    return { userId };
  }
}
