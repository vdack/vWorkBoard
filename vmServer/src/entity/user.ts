import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('user')
export class User {

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

};

@Entity('token')
export class Token {
  @PrimaryColumn()
  uid: number;

  @Column()
  lastAuthorized: Date;

  @Column()
  authToken: string;

}
