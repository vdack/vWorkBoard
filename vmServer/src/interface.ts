/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

export interface ILoginUser {
  name: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  password: string;
}

export interface IProject {
  pid: number,
  name: string,
}

export interface IProjectUser {
  uid: number,
  name: string,
}
