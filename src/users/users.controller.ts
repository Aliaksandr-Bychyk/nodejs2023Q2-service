import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
import { UpdateUsersDto } from './dto/update-users.dto';
import exceptionHandler from 'src/utils/exceptionHandler';
import { ResponsesMessages } from 'src/interfaces/ResponsesMessages';

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
    description: ResponsesMessages.UnauthorizedError,
  })
  @HttpCode(200)
  getUsers() {
    try {
      return this.usersService.getUsers();
    } catch (error) {
      exceptionHandler(error as Error);
    }
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
    description: ResponsesMessages.UnauthorizedError,
  })
  @HttpCode(201)
  postUsers(@Body() createUsersDto: CreateUsersDto) {
    try {
      return this.usersService.createUser(createUsersDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Get(':userId')
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
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(200)
  getUser(@Param('userId') userId: string) {
    try {
      return this.usersService.getUser(userId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Put(':userId')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              oldPassword: {
                type: 'string',
                description: "The user's old password",
              },
              newPassword: {
                type: 'string',
                description: "The user's new password",
              },
            },
            required: ['oldPassword', 'newPassword'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been updated.',
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
            login: {
              type: 'string',
              example: 'TestUser',
            },
            version: {
              type: 'integer',
              example: 2,
            },
            createAt: {
              type: 'integer',
              example: 1655000000,
            },
            updateAt: {
              type: 'integer',
              example: 1655999999,
            },
          },
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
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(200)
  putUser(
    @Param('userId') userId: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    try {
      return this.usersService.putUser(userId, updateUsersDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Delete(':userId')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 401,
    description: ResponsesMessages.UnauthorizedError,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @HttpCode(204)
  deleteUser(@Param('userId') userId: string) {
    try {
      this.usersService.deleteUser(userId);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }
}
