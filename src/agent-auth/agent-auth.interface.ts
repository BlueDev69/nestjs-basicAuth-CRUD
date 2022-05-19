export interface IAccount {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;

  id?: any;
  position?: string;
  image?: string;
  role?: RoleAccount;
  created?: Date;
  updated?: Date;
}

// login
export interface IAgentLogin {
  email: string;
  password: string;
}

// register
export interface IAgentRegister {
  image: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
}

// สิทธ์ผู้ใช้งาน
export enum RoleAccount {
  Member = 1,
  Employee,
  Admin,
}
export interface IMemberDocument extends IAccount, Document {}

export interface IAuthen {
  generateAccessToken(member: IAccount): Promise<string>;
  validateUser(accessToken): Promise<IAccount>;
}
