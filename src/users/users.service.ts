import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    data: Pick<User, 'name' | 'email' | 'passwordHash'>,
  ): Promise<UserDocument> {
    try {
      return await this.userModel.create(data);
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        throw new ConflictException('Ya existe un usuario con ese email.');
      }
      throw error;
    }
  }

  findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).exec();
  }
}
