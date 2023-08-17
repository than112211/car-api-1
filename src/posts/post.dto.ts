import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';
import { Post } from './post.entity';

export class CreatePostDto {
  static resource = Post.name;

  @MaxLength(50)
  @IsNotEmpty()
  title: string;

  @MaxLength(500)
  @IsNotEmpty()
  content: string;
}

export class ReturnPostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  content: string;

  @Expose()
  image: string;
}

export class PostParamsDto {
  static resource = Post.name;

  @IsUUID()
  id: string;
}
