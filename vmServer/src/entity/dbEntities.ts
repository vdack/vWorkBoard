import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => TComment, tComment => tComment.user,  { cascade: true, onDelete: 'CASCADE' })
  comments: Comment[];

  @OneToMany(() => Notification, notification => notification.user,  { cascade: true, onDelete: 'CASCADE' })
  notifications: Notification[];
};

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn()
  pid: number;

  @Column()
  name: string;

  @OneToMany(() => SubProject, subProject => subProject.project,  { cascade: true })
  subProjects: SubProject[];

  @OneToMany(() => Notification, notification => notification.project,  { cascade: true, onDelete: 'CASCADE' })
  notifications: Notification[];
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

  @ManyToOne(() => Project, project => project.subProjects, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'pid'})
  project: Project;

  @Column()
  pid: number;

  @OneToMany(() => SubTask, subTask => subTask.subProject,  { cascade: true,})
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

  @ManyToOne(() => SubProject, subProject => subProject.subTasks, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'spid'})
  subProject: SubProject;

  @Column()
  spid: number;

  @OneToMany(() => TComment, tComment => tComment.subTask,  { cascade: true,})
  comments: TComment[];

  @OneToMany(() => TFile, tFile => tFile.subTask,  { cascade: true,})
  files: TFile[];

}

@Entity('tComment')
export class TComment {
  @PrimaryGeneratedColumn()
  cid: number;

  @Column()
  content: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  date: Date;

  @ManyToOne(() => SubTask, subTask => subTask.comments, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'tid'})
  subTask: SubTask;

  @Column()
  tid: number;

  @ManyToOne(() => User, user => user.comments, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'uid'})
  user: User;

  @Column()
  uid: number;
}
@Entity('file')
export class TFile {
  @PrimaryGeneratedColumn()
  fid: number;

  @ManyToOne(() => SubTask, subTask => subTask.files, {onDelete: 'SET NULL'})
  @JoinColumn({name: 'tid'})
  subTask: SubTask;

  @Column({nullable: true})
  tid: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  date: Date;
};

@Entity('notification')
export class Notification {
  @PrimaryGeneratedColumn()
  nid: number

  @ManyToOne(() => User, user => user.notifications, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'uid'})
  user: User;

  @Column()
  uid: number;

  @ManyToOne(() => Project, project => project.notifications, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'pid'})
  project: Project;

  @Column()
  pid: number;

  @Column({default: false})
  have_read: boolean;

  @Column()
  action: string;

  @Column()
  date: Date;
}
