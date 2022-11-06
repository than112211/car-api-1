import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserDto,
  UserParamsDto,
  UpdatePasswordUserDto,
  ResponseUserDto,
} from 'src/users/user.dto';
import { Auth } from 'src/shared/guards/auth';
import { ResponseController } from 'src/shared/interceptors/transformResponse.interceptor';
import { UserService } from 'src/users/user.service';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';

@Controller('user')
@UseGuards(Auth)
@Serialize(ResponseUserDto)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<ResponseController> {
    const data = await this.userService.create(body);
    return {
      message: 'Tạo thành công user',
      data,
    };
  }

  @Get()
  async getAll(): Promise<ResponseController> {
    const data = await this.userService.findAll();
    return {
      message: 'Lấy thành công danh sách user',
      data,
    };
  }

  @Get(':id')
  async getById(@Param() params: UserParamsDto): Promise<ResponseController> {
    const data = await this.userService.findById(params.id);
    return {
      message: 'Lấy thành công user',
      data,
    };
  }

  @Patch(':id')
  async updatePassword(
    //Neu validate DTO bo sau : con validate build-in bo vao ()
    @Param() params: UserParamsDto,
    // validate body theo Dto
    @Body() body: UpdatePasswordUserDto,
  ): Promise<ResponseController> {
    await this.userService.updatePassword(params.id, body.password);
    return {
      message: 'Cập nhật mật khẩu thành công',
    };
  }

  @Delete(':id')
  async deleteUser(
    // validate id kieu la uuid
    @Param() params: UserParamsDto,
  ): Promise<ResponseController> {
    await this.userService.deleteUser(params.id);
    return {
      message: 'Xóa thành công',
    };
  }
}
