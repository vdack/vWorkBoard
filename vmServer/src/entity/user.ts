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
