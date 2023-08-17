import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreatePostDto, PostParamsDto, ReturnPostDto } from './post.dto';
import { PostService } from './post.service';
import {
  ResponseController,
  Serialize,
} from 'src/shared/interceptors/serialize.interceptor';
import { AuthGuard } from 'src/shared/guards/auth';
import { IDataUser } from 'src/users/user.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ENV } from 'src/constant/constant.env';
import { QueryPaginationDto } from 'src/shared/dto/common.dto';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/assets`);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  },
});

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @Serialize(ReturnPostDto)
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: storage,
    }),
  )
  async createPost(
    @Body() body: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Req()
    req: {
      user: IDataUser;
    },
  ): Promise<ResponseController> {
    const newBody = {
      ...body,
      image: `${ENV.HOST}/${file.filename}`,
    };
    const data = await this.postService.create(newBody, req.user);
    return {
      message: 'Tạo bài viết thành công',
      ...data,
    };
  }

  @Get()
  @Serialize(ReturnPostDto)
  async getAllPost(
    @Query() query: QueryPaginationDto,
  ): Promise<ResponseController> {
    const data = await this.postService.getAll(query);
    return {
      message: 'Lấy danh sách bài viết thành công',
      ...data,
    };
  }

  @Get('/me')
  @Serialize(ReturnPostDto)
  @UseGuards(AuthGuard)
  async getMyPost(
    @Query() query: QueryPaginationDto,

    @Req()
    req: {
      user: IDataUser;
    },
  ): Promise<ResponseController> {
    const data = await this.postService.getListByUserId(req.user.id, query);
    console.log(data);
    return {
      message: 'Lấy danh sách bài viết của mình thành công',
      ...data,
    };
  }

  @Get(':id')
  @Serialize(ReturnPostDto)
  async getListPostByUserId(
    @Query() query: QueryPaginationDto,

    @Param() params: PostParamsDto,
  ): Promise<ResponseController> {
    const data = await this.postService.getListByUserId(params.id, query);
    console.log(data);
    return {
      message: 'Lấy danh sách bài viết thành công',
      ...data,
    };
  }
}
