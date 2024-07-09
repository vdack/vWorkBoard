import { Provide } from '@midwayjs/core';
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

  async Login(para: ILoginUser) {
    console.log('account:', para.name);
    console.log('password:', para.password);
    return {
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
      return {found: true, id: findres.id}
    }
  }
}
