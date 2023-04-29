import { Injectable,NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) { }
    async createUser(username: string, password: string): Promise<User> {
        const user = await this.getUser({ username });
        
        if (user) {
            throw new NotAcceptableException('username sudah dipakai');
          }
        return this.userModel.create({
            username,
            password,
        });
    }
    async getUser(query: object ): Promise<User> {
        return this.userModel.findOne(query);
    }
}
