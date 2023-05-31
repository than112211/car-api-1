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
  UserDto,
  UserParamsDto,
  UpdatePasswordUserDto,
  UserReturnLoginDto,
  UserReturnDto,
  UserRefreshTokenDto,
} from 'src/users/user.dto';
import { AuthGuard } from 'src/shared/guards/auth';
import { ResponseController } from 'src/shared/interceptors/transformResponse.interceptor';
import { UserService } from 'src/users/user.service';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Serialize(UserReturnDto)
  async createUser(@Body() body: UserDto): Promise<ResponseController> {
    const data = await this.userService.create(body);
    return {
      message: 'Tạo thành công user',
      data,
    };
  }

  @Get()
  @Serialize(UserReturnDto)
  async getAll(): Promise<ResponseController> {
    const data = await this.userService.findAll();
    return {
      message: 'Lấy thành công danh sách user',
      data,
    };
  }

  @UseGuards(AuthGuard)
  @Serialize(UserReturnDto)
  @Get(':id')
  async getById(@Param() params: UserParamsDto): Promise<ResponseController> {
    const data = await this.userService.findById(params.id);
    return {
      message: 'Lấy thành công user',
      data,
    };
  }

  @UseGuards(AuthGuard)
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

  @Post('/login')
  @Serialize(UserReturnLoginDto)
  async login(@Body() body: UserDto): Promise<ResponseController> {
    const data = await this.userService.login(body);
    return {
      message: 'Đăng nhập thành công',
      data,
    };
  }

  @Post('/refreshToken')
  async refreshToken(
    @Body() body: UserRefreshTokenDto,
  ): Promise<ResponseController> {
    const data = await this.userService.refreshToken(body.refresh_token);
    return {
      message: 'Refresh JWT thành công',
      data,
    };
  }
}
