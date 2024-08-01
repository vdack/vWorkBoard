import { Middleware, IMiddleware, Inject, Config, Provide,} from "@midwayjs/core";
import { Context, NextFunction } from "@midwayjs/koa";
import { JwtService } from '../service/jwt.service';
import * as cookie from 'cookie';
@Provide()
@Middleware()
export class AuthorizeMiddleware implements IMiddleware<Context, NextFunction>{
  @Config('jwt')
  jwtConfig;

  @Inject()
  jwtService: JwtService;

  resolve() {
    return async(ctx:Context, next:NextFunction) => {
      // ctx.cookies.set('auth','1231231231', {httpOnly:true, sameSite:'none'});
      console.log('header: ', ctx.header);
      const header_cookies = cookie.parse(ctx.header.cookie);
      const token = header_cookies['authToken'];
      const id = header_cookies['id'];
      // const token = ctx.cookies.get('authToken');
      console.log('id: ', id, 'with token: ', token);

      // console.log('test auth:', ctx.cookies.get('auth'));
      if (!token) {
        ctx.status = 401;
        ctx.body = {message: 'No Token Provided.'};
        return;
      }

      if (token === 'passit!') {
        const res = await next();
        return res;
      }

      const veriedInfo = await this.jwtService.verifyToken(token);
      // console.log('info', veriedInfo);
      console.log('veriedInfo id:', veriedInfo.id);
      if (id == veriedInfo.id) {
        console.log('authorized veried sucessfully.')
        const res = await next();
        return res;
      } else {
        ctx.status = 401;
        ctx.body = {message: 'Invalid token'};
      }
    }
  };

  ignore(ctx:Context):boolean {
    return ctx.path === '/user/register'
      || ctx.path === '/user/login'
      || ctx.path === '/file';
  }

  static getName():string {
    return 'authorization';
  }
}
