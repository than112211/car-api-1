export interface IUser {
  email: string;
  password: string;
}

export interface IReturnLogin extends IUser {
  access_token: string;
  refresh_token: string;
}

export interface IReturnRefreshToken {
  access_token: string;
}
