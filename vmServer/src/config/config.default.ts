import { MidwayConfig } from '@midwayjs/core';
import { User, Token, Project, SubProject, SubTask, TComment, TFile } from '../entity/dbEntities';
import { Project_User } from '../entity/dbRelations';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1720499587314_8790',
  koa: {
    port: 7001,
  },
  webSocket: {
    port: 7002,
  },
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    allowMethods: ['GET','HEAD','PUT','POST','DELETE','PATCH'],
    allowHeaders: 'Content-Type, Authorization, Cookie, X-Requested-With',
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

        entities: [User, Token, Project, SubProject, SubTask, TComment, Project_User, TFile],
      },
    },

  },
  jwt: {
    secret: 'vdack-common-test',
    expiresIn: 60*60,
  },
} as MidwayConfig;


