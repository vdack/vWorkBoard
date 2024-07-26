import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity('pjct_usr')
export class Project_User {
  @PrimaryColumn()
  uid: string;

  @PrimaryColumn()
  pid: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date: Date;
}
