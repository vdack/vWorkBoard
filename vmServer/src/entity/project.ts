import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
