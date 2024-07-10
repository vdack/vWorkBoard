import { IUser } from './../interface';
import { httpError, Provide } from '@midwayjs/core';
import { IUserOptions, ILoginUser } from '../interface';
import { User } from '../entity/user';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class UserService {

  @InjectEntityModel(User)
  userModel: Repository<User>;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async register(para: ILoginUser) {
    const findres = await this.userModel.findOne({
      where: {
        name: para.name
      }
    });
    if (findres) {
      return new httpError.BadRequestError('USER EXISTED');
    }
    const id = await this.userModel.count() + 123;
    console.log('id:', id);
    const newUser: IUser = {id, name: para.name, password: para.password};
    const res = await this.userModel.save(newUser);
    console.log('login result:', res);
    return ({
      status: 200,
      sucess: true,
      name: para.name,
    });
  }

  async login(para: ILoginUser) {
    const findres = await this.userModel.findOne({
      where: {
        name: para.name
      },
    });
    console.log('findres: ',findres);

    if (!findres) {
      console.log('user not exist');
      return new httpError.BadRequestError('USER NOT EXIST');
    }
    if (findres.password !== para.password) {
      console.log('password incorrect');
      return new httpError.UnauthorizedError('PASSWORD INCORRECT');
    }
    return {
      status: 200,
      id: findres.id,
      found: true,
      password: true
    };
  }

  async getUserByName(name: string) {
    console.log('get name:', name);
    const findres = await this.userModel.findOne({
      where: {
        name
      },
    });
    if (!findres) {
      return {found: false};
    } else {
      return {found: true, id: findres.id, name: findres.name}
    }
  }

  async getUserById(id: number) {
    const findres = await this.userModel.findOne({
      where: {
        id
      },
    });
    if (!findres) {
      return {found: false};
    } else {
      return {found: true, id: findres.id, name: findres.name}
    }
  }
}
