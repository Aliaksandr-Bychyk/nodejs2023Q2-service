import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from 'src/interfaces/IUser';
import { v4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import uuidValidate from 'src/utils/uuidValidate';
import findRecord from 'src/utils/findRecord';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers() {
    return (await this.prisma.users.findMany()).map((user) => ({
      ...user,
      password: undefined,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    }));
  }

  async postUser({ login, password }: CreateUserDto) {
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
    await this.prisma.users.create({
      data: newUser,
    });
    return { ...newUser, password: undefined };
  }

  async getUser(userId: string) {
    uuidValidate(userId);
    const user = await findRecord(this.prisma, userId, 'users');
    return {
      ...user,
      password: undefined,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async putUser(userId: string, { oldPassword, newPassword }: UpdateUserDto) {
    uuidValidate(userId);
    if (!(oldPassword && newPassword)) {
      throw new Error('400');
    }
    const user = await findRecord(this.prisma, userId, 'users');
    if ((user as IUser).password !== oldPassword) {
      throw new Error('403');
    }
    const update = await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      },
    });
    return {
      ...update,
      createdAt: Number(update.createdAt),
      updatedAt: Number(update.updatedAt),
      password: undefined,
    };
  }

  async deleteUser(userId: string) {
    uuidValidate(userId);
    await findRecord(this.prisma, userId, 'users');
    await this.prisma.users.delete({
      where: {
        id: userId,
      },
    });
  }

  async findByLogin(login: string) {
    return await this.prisma.users.findMany({
      where: {
        login,
      },
    });
  }
}
