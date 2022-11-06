import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userError } from 'src/errors/constant/user.constant';
import { User } from 'src/users/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { IUser } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: IUser): Promise<User> {
    const data = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (data) {
      throw new BadRequestException(userError.isExistEmail);
    } else {
      return this.userRepository.save(user);
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const data = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (data) {
      return data;
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }

  async updatePassword(id: string, password: string): Promise<UpdateResult> {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (data) {
      return this.userRepository.update(id, { password });
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const data = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (data) {
      return this.userRepository.delete(id);
    } else {
      throw new BadRequestException(userError.isNotExistUser);
    }
  }
}
