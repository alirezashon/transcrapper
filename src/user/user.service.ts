import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Avatar } from './schemas/avatar.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    @InjectModel(Avatar.name)
    private readonly avatarModel: mongoose.Model<Avatar>,
  ) {}
  async create(user: User): Promise<User> {
    const res = await this.userModel.create(user);
    return res;
  }
}
