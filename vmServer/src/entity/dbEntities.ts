import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => TComment, tComment => tComment.user)
  comments: Comment[];
};

@Entity('token')
export class Token {
  @PrimaryColumn()
  uid: number;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  lastAuthorized: Date;

  @Column()
  authToken: string;

}

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  pid: number;

  @Column()
  name: string;

  @OneToMany(() => SubProject, subProject => subProject.project)
  subProjects: SubProject[];
}

@Entity('subProject')
export class SubProject {
  @PrimaryGeneratedColumn()
  spid: number;

  @Column()
  name: string;

  @Column({default: ''})
  discription: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  last_modified_date: Date;

  @ManyToOne(() => Project, project => project.subProjects)
  @JoinColumn({name: 'pid'})
  project: Project;

  @Column()
  pid: number;

  @OneToMany(() => SubTask, subTask => subTask.subProject)
  subTasks: SubTask[];
}
@Entity('subTask')
export class SubTask {
  @PrimaryGeneratedColumn()
  tid: number;

  @Column({default: 'TASK_HEADER'})
  header: string;

  @Column({default: ''})
  content: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  created_date: Date;

  @Column({default: false})
  finished: boolean;

  @ManyToOne(() => SubProject, subProject => subProject.subTasks)
  @JoinColumn({name: 'spid'})
  subProject: SubProject;

  @Column()
  spid: number;

  @OneToMany(() => TComment, tComment => tComment.subTask)
  comments: Comment[];


}

@Entity('tComment')
export class TComment {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  content: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date: Date;

  @ManyToOne(() => SubTask, subTask => subTask.comments)
  @JoinColumn({name: 'tid'})
  subTask: SubTask;

  @Column()
  tid: number;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({name: 'uid'})
  user: User;

  @Column()
  uid: number;
}
