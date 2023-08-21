import { Controller, Post, HttpCode, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import exceptionHandler from 'src/utils/exceptionHandler';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
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
  @HttpCode(201)
  async postSignup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.postSignup(createUserDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Login user',
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
    description: 'The user has been logged',
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
    status: 403,
    description:
      "Authentication failed (no user with such login, password doesn't match actual one, etc.)",
  })
  @HttpCode(201)
  async postLogin(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.authService.postLogin(createUserDto);
    } catch (error) {
      exceptionHandler(error as Error);
    }
  }

  @Post('/refresh')
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Get new pair of Access token and Refresh token',
    description: 'Get new pair of Access token and Refresh token',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            title: 'example',
            properties: {
              refreshToken: {
                type: 'string',
                description: "The user's refresh Token",
              },
            },
            required: ['refreshToken'],
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The token has been created',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'example',
          properties: {
            refreshToken: {
              type: 'string',
              description: "The user's refresh Token",
            },
            accessToken: {
              type: 'string',
              description: "The user's refresh Token",
            },
          },
          required: ['refreshToken', 'accessToken'],
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Bad request. body does not contain required fields.',
  })
  @ApiResponse({
    status: 403,
    description:
      "Authentication failed (no user with such login, password doesn't match actual one, etc.)",
  })
  @HttpCode(200)
  postRefresh(@Body() refreshTokenDto: { refreshToken: string }) {
    return this.authService.postRefresh(refreshTokenDto);
    // try {
    //   return await this.userService.putUser(userId, updateUserDto);
    // } catch (error) {
    //   exceptionHandler(error as Error);
    // }
  }
}
