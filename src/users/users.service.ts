import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hashSync } from 'bcryptjs';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  CreateUserDtoFromFrontend,
} from './dto/create-user.dto';
import { User, UserDocument, Role } from './entities/user.entity';
import { OurExceptionType } from 'src/common/errors/OurExceptionType';
import { OurHttpException } from 'src/common/errors/OurHttpException';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDtoFromFrontend) {
    const dtoWithHash: CreateUserDto = {
      email: createUserDto.email,
      passwordHash: this.hashPassword(createUserDto.password),
      role: Role.USER,
    };
    if (await this.getOneByEmail(createUserDto.email)) {
      throw new OurHttpException(OurExceptionType.USER_ALREADY_EXISTS);
    }
    const createdUser = new this.userModel(dtoWithHash);
    return createdUser.save();
  }

  hashPassword(password: string) {
    return hashSync(password, 10);
  }

  getOneByEmail(email: string) {
    return this.userModel.findOne({
      email,
    });
  }

  getOneById(id: string) {
    return this.userModel.findById(id);
  }
}
