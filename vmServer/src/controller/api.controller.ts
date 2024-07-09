import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Get('/LoginUser')
  async LoginUser(@Query('name') name, @Query('password') password) {
    const user = await this.userService.Login({name, password});
    return {sucess: true, message: 'OK', data: user};
  }
  @Get('/user_name')
  async getUserByName(@Query('name') name) {
    console.log('name:', name);
    const user = await this.userService.getUserByName(name);
    return {success: true, message: 'OK', data: user};
  }
}
