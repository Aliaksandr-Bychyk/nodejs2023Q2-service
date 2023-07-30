import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    return this.usersService.getUsers();
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              login: {
                type: 'string',
                description: "The user's login",
              },
              password: {
                type: 'string',
                description: "The user's password",
              },
            },
            required: ['login', 'password'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been created',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User'),
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
    description: 'Access token is missing or invalid',
  })
  postUsers(createUsersDto: CreateUsersDto) {
    return [];
  }

  @Get('{userId}')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    content: {
      'application/json': {
        schema: {
          $ref: getSchemaPath('User'),
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
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
