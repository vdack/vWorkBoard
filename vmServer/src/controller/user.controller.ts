import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/user')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/byName')
  async getUserByName(@Query('name') name) {
    const user = await this.userService.getUserByName(name);
    return {success: true, message: 'OK', data: user};
  }

  @Get('/byId')
  async getUserById(@Query('id') id) {
    const user = await this.userService.getUserById(id);
    return {sucess: true, message: 'OK', data: user};
  }

  @Post('/register')
  async register(@Body('name')name:string, @Body('password')password: string) {
    console.log('register for:', name, password);
    const user = await this.userService.register({name, password});
    return {sucess: true, message: 'OK', data: user};
  }

  @Post('/login')
  async login(@Body('name')name:string, @Body('password')password: string) {
    console.log('login for:', name, password);
    const res = await this.userService.login({name, password});
    return {sucess: true, message: 'OK', data: res};
  }

}
