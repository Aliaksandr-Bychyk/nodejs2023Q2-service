import { Injectable } from '@nestjs/common';
import usersDB from 'src/databases/usersDB';
import { CreateUsersDto } from './dto/create-users.dto';
import { IUser } from 'src/interfaces/IUser';
import { v5 } from 'uuid';
import { createHash } from 'node:crypto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  getUsers() {
    return usersDB;
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
    usersDB.push(newUser);
    return {
      id: newUser.id,
      login: newUser.login,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };
  }

  getUser(userId: string) {
    return usersDB.find((user) => user.id === userId);
  }

  putUser(userId: string, updateUserDto: UpdateUsersDto) {
    const user = usersDB.find((user) => user.id === userId);
    if (!user) {
      throw new Error();
    }
    const hashedOldPassword = createHash('sha256')
      .update(updateUserDto.oldPassword)
      .digest('hex');
    if (user.password !== hashedOldPassword) {
      throw new Error();
    }
    user.password = createHash('sha256')
      .update(updateUserDto.newPassword)
      .digest('hex');
    user.version = user.version + 1;
    user.updatedAt = Math.floor(Date.now() / 1000);
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
