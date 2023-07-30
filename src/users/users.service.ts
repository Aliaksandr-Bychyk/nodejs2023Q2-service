import { Injectable } from '@nestjs/common';
import userDB from 'src/databases/usersDB';
import { CreateUsersDto } from './dto/create-users.dto';
import { IUser } from 'src/interfaces/IUser';
import { v5 } from 'uuid';
import { createHash } from 'node:crypto';

@Injectable()
export class UsersService {
  getUsers() {
    return userDB;
  }

  createUser({ login, password }: CreateUsersDto) {
    const newUser: IUser = {
      id: v5(login, v5.URL),
      login,
      password: createHash('sha256').update(password).digest('hex'),
      version: 1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    };
    userDB.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  getUser(userId: string) {
    return userDB.find((user) => user.id === userId);
  }

  update(id: number /*, updateUserDto: UpdateUserDto*/) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
