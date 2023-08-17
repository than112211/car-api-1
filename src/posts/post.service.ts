import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDataUser } from 'src/users/user.type';
import { ICreatePostBody } from './post.types';
import {
  IQueryPagination,
  IResponse,
  IResponseWidthPagination,
} from 'src/shared/types/common.type';
import { convertPagination } from 'src/shared/service/common.service';

@Injectable() // đánh dấu class là 1 providers
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(
    post: ICreatePostBody,
    user: IDataUser,
  ): Promise<IResponse<Post>> {
    const data = await this.postRepository.save({
      user,
      ...post,
    });

    return {
      data,
    };
  }

  async getAll(
    query: IQueryPagination,
  ): Promise<IResponseWidthPagination<Post[]>> {
    const [postList, count] = await this.postRepository.findAndCount({
      ...convertPagination(query),
    });

    return {
      data: postList,
      pagination: {
        total: count,
      },
    };
  }

  async getListByUserId(
    userId: string,
    query: IQueryPagination,
  ): Promise<IResponseWidthPagination<Post[]>> {
    const [postList, count] = await this.postRepository.findAndCount({
      where: {
        user: {
          id: userId,
        },
      },
      ...convertPagination(query),
    });

    return {
      data: postList,
      pagination: {
        total: count,
      },
    };
  }
}
