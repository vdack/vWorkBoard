import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1720499587314_8790',
  koa: {
    port: 7001,
  },
  cors: {
    origin: '*',
  },
  typeorm: {
    dataSource:{
      default:{
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'vdack',
        password: 'password',
        database: 'vwbdb',
        synchronize: true,
        logging: true,

        entities: [User],
      },
    },

  },
} as MidwayConfig;


