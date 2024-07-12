import { Inject, Controller, Get, Query, Post, Body, httpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { JwtService } from '../service/jwt.service';
@Controller('/user')
export class APIController {
  @Inject()
  ctx: Context;
  @Inject()
  userService: UserService;
  @Inject()
  jwtService: JwtService;

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
    if (!user.id) {
      return new httpError.BadRequestError('User Already Exists!');
    }
    return {name:"Register", code: '200', status: 200, data: user};
  }

  @Post('/login')
  async login(@Body('name')name:string, @Body('password')password: string) {
    console.log('login for:', name, password);
    const res = await this.userService.login({name, password});
    if (res.status == 200) {
      const token = this.jwtService.generateToken({id: res.id, name: res.name, password: res.password});
      return {name: 'Login', code: '200', status: 200, data: {name:res.name, token}};
    }
    if (res.status == 400) {
      return new httpError.BadRequestError('Name Not Exists.');
    }
    if (res.status == 401) {
      return new httpError.UnauthorizedError('Password Incorrect.');
    }
    return new httpError.NotFoundError('Unkown Error');
  }

}
