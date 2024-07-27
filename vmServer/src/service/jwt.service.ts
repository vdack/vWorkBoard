import { Provide, Config, Inject, Scope, ScopeEnum} from '@midwayjs/decorator';
import { JwtService as MidwayJwtservice } from '@midwayjs/jwt';
import { IUser } from '../interface';

@Provide()
@Scope(ScopeEnum.Singleton)
export class JwtService {
  private static instance: JwtService;
  private constructor() {};
  @Inject()
  jwt: MidwayJwtservice;

  @Config('jwt')
  jwtConfig;

  public static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }
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
  verifyToken(token: string): Promise<any> {
    try {
      const info = this.jwt.verify(token, this.jwtConfig);
      return info;
    } catch(err) {
      console.log('Error when JwtService: ', err);
    }

  }
};

