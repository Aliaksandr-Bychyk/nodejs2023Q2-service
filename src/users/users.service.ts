import { Injectable } from '@nestjs/common';
import userDB from 'src/databases/usersDB';

@Injectable()
export class UsersService {
  create(/*createUserDto: CreateUserDto*/) {
    return 'This action adds a new user';
  }

  getUsers() {
    return userDB;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number /*, updateUserDto: UpdateUserDto*/) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
