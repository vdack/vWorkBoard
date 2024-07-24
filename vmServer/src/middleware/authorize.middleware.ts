import { Middleware, IMiddleware, Config, Provide, Inject } from "@midwayjs/core";
import { Context, NextFunction } from "@midwayjs/koa";
import { JwtService } from "@midwayjs/jwt";
@Provide()
@Middleware()
export class AuthorizeMiddleware implements IMiddleware<Context, NextFunction>{
  @Config('jwt')
  jwtConfig;

  @Inject()
  jwtService: JwtService;

  resolve() {
    return async(ctx:Context, next:NextFunction) => {
      const token = ctx.cookies.get('authToken');
      if (!token) {
        ctx.status = 401;
        ctx.body = {message: 'No Token Provided.'};
        return;
      }
      try {
        const veriedInfo = this.jwtService.verify(token);
        ctx.logger.info(`currnet veried Info: ${veriedInfo}.`);
        ctx.user = veriedInfo;
        const res = await next();
        return res;
      } catch(err) {
        ctx.status = 401;
        ctx.body = {message: 'Invalid token'};
      }
    }
  };

  ignore(ctx:Context):boolean {
    return ctx.path === '/user/register'
      || ctx.path === '/user/login';
  }

  static getName():string {
    return 'authorization';
  }
}
