// import { Provide, Init, Inject } from "@midwayjs/core";
// import { DataSource } from 'typeorm';

// @Provide()
// export class DatabaseService {
//   @Inject()
//   dataSource: DataSource;

//   @Init()
//   async init() {
//     const removeOutdateToken = `
//       CREATE EVENT remove_outdate_token
//       ON SCHEDULE EVERY 1 HOUR
//       DO
//         DELETE FROM Token
//         WHERE TIMESTAMPDIFF(HOUR, lastAuthorized, NOW()) > 2;
//     `;
//     await this.dataSource.query(removeOutdateToken);
//   }
// }
