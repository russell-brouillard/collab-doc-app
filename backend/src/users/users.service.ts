import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}:${derivedKey.toString('hex')}`;
  }

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await this.hashPassword(password);
    const createdUser = new this.userModel({
      username,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  // If you have a login or password verification step:
  // async verifyUser(username: string, password: string): Promise<boolean> {
  //   const user = await this.findOne(username);
  //   if (!user) return false;
  //
  //   const [salt, key] = user.password.split(':');
  //   const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  //   return key === derivedKey.toString('hex');
  // }
}
