import { Injectable } from '@nestjs/common';
import usersDB from 'src/databases/usersDB';
import { CreateUsersDto } from './dto/create-users.dto';
import { IUser } from 'src/interfaces/IUser';
import { v4 } from 'uuid';
import { createHash } from 'node:crypto';
import { UpdateUsersDto } from './dto/update-users.dto';
import uuidValidate from 'src/utils/uuidValidate';
import findUser from 'src/utils/findUser';

@Injectable()
export class UsersService {
  getUsers() {
    return usersDB;
  }

  createUser({ login, password }: CreateUsersDto) {
    if (!(login && password)) {
      throw new Error('400');
    }
    const newUser: IUser = {
      id: v4(),
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
    uuidValidate(userId);
    const user = findUser(userId);
    return user;
  }

  putUser(userId: string, { oldPassword, newPassword }: UpdateUsersDto) {
    uuidValidate(userId);
    const user = findUser(userId);
    if (!(oldPassword && newPassword)) {
      throw new Error('400');
    }
    const hashedOldPassword = createHash('sha256')
      .update(oldPassword)
      .digest('hex');
    if (user.password !== hashedOldPassword) {
      throw new Error('403');
    }
    user.password = createHash('sha256').update(newPassword).digest('hex');
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

  deleteUser(userId: string) {
    uuidValidate(userId);
    const user = findUser(userId);
    const userIndex = usersDB.indexOf(user);
    usersDB.splice(userIndex, 1);
  }
}
