import { Injectable } from '@nestjs/common';
import usersDB from 'src/databases/usersDB';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from 'src/interfaces/IUser';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import uuidValidate from 'src/utils/uuidValidate';
import findUser from 'src/utils/findUser';

@Injectable()
export class UsersService {
  getUsers() {
    return usersDB.map((user) => ({ ...user, password: undefined }));
  }

  createUser({ login, password }: CreateUserDto) {
    if (!(login && password)) {
      throw new Error('400');
    }
    const newUser: IUser = {
      id: v4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    usersDB.push(newUser);
    return { ...newUser, password: undefined };
  }

  getUser(userId: string) {
    uuidValidate(userId);
    const user = findUser(userId);
    return { ...user, password: undefined };
  }

  putUser(userId: string, { oldPassword, newPassword }: UpdateUserDto) {
    uuidValidate(userId);
    if (!(oldPassword && newPassword)) {
      throw new Error('400');
    }
    const user = findUser(userId);
    if (user.password !== oldPassword) {
      throw new Error('403');
    }
    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
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
