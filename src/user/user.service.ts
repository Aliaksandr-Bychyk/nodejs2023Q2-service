import { Injectable } from '@nestjs/common';
import usersDB from 'src/databases/usersDB';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from 'src/interfaces/IUser';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import uuidValidate from 'src/utils/uuidValidate';
import findRecord from 'src/utils/findRecord';

@Injectable()
export class UserService {
  getUsers() {
    return usersDB.map((user) => ({ ...user, password: undefined }));
  }

  postUser({ login, password }: CreateUserDto) {
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
    const user = findRecord(usersDB, userId);
    return { ...user, password: undefined };
  }

  putUser(userId: string, { oldPassword, newPassword }: UpdateUserDto) {
    uuidValidate(userId);
    if (!(oldPassword && newPassword)) {
      throw new Error('400');
    }
    const user = findRecord(usersDB, userId);
    if ((user as IUser).password !== oldPassword) {
      throw new Error('403');
    }
    (user as IUser).password = newPassword;
    (user as IUser).version = (user as IUser).version + 1;
    (user as IUser).updatedAt = Date.now();
    return {
      id: user.id,
      login: (user as IUser).login,
      version: (user as IUser).version,
      createdAt: (user as IUser).createdAt,
      updatedAt: (user as IUser).updatedAt,
    };
  }

  deleteUser(userId: string) {
    uuidValidate(userId);
    const user = findRecord(usersDB, userId);
    const userIndex = usersDB.indexOf(user as IUser);
    usersDB.splice(userIndex, 1);
  }
}
