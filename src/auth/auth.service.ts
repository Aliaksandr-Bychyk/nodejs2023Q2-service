import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async postSignup({ login, password }: CreateUserDto) {
    const hash = await bcrypt.hash(password, process.env.CRYPT_SALT || '10');
    return await this.userService.postUser({ login, password: hash });
  }

  async postLogin({ login, password }: CreateUserDto) {
    const user = (await this.userService.findByLogin(login))[0];
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async postRefresh({ refreshToken }: { refreshToken: string }) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.userService.findByLogin(decoded.login);
      if (!user) {
        throw new Error('User not found');
      }

      return {
        accessToken: this.generateAccessToken(user),
        refreshToken: this.generateRefreshToken(user),
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async generateAccessToken(user: any) {
    return await this.jwtService.signAsync(
      { userId: user.id, login: user.login },
      { expiresIn: process.env.TOKEN_EXPIRE_TIME || '1h' },
    );
  }

  async generateRefreshToken(user: any) {
    return await this.jwtService.signAsync(
      { userId: user.id, login: user.login },
      { expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h' },
    );
  }
}
