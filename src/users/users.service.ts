import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto, User } from './user.model';

// export type TUser = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// };

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  //  Get all users
  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    }));
  }

  // Create User
  async insertUser(body: CreateUserDto) {
    const newUser = new this.userModel(body);
    const result = await newUser.save();
    return result;
  }

  // Get single user
  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
    };
  }

  // update user
  async updateUser(userId: string, body: CreateUserDto) {
    const updatedUser = await this.findUser(userId);
    if (!updatedUser) {
      throw new NotFoundException('Could not find user.');
    }

    const patch = await this.userModel.findByIdAndUpdate(userId, body);
    if (!patch) {
      throw new NotFoundException();
    }
    // return body;
    return patch;
  }

  // Delete sigle user
  async deleteUser(userId: string) {
    const user = await this.findUser(userId);
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }

    try {
      await this.userModel.deleteOne({ _id: userId }).exec();
    } catch (error) {
      throw new NotFoundException(error);
    }

    return user;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  private async findUser(id: string): Promise<User> {
    let user: User | PromiseLike<User>;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }
}
