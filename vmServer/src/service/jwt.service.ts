import { Provide, Config, Inject } from '@midwayjs/decorator';
import { JwtService as MidwayJwtservice } from '@midwayjs/jwt';
import { IUser } from '../interface';

@Provide()
export class JwtService {
  @Inject()
  jwt: MidwayJwtservice;

  @Config('jwt')
  jwtConfig;

  /**
   * generate JWT when login.
   * @param payload   - data for generate token.
   * @param ttl       - time to live
   */
  generateToken(payload: IUser): Promise<string> {
    return this.jwt.sign(payload, this.jwtConfig);
  };

  /**
   * verify the JWT for any service with authorization.
   * @param token - token to be virified.
   */
  verifyToken(token: string): any {
    return this.jwt.verify(token, this.jwtConfig);
  }
};
