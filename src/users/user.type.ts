export interface IUser {
  email: string;
  password: string;
}

export interface IDataUser extends IUser {
  id: string;
  admin: boolean;
}

export interface IReturnLogin extends IUser {
  access_token: string;
  refresh_token: string;
}

export interface IReturnRefreshToken {
  access_token: string;
}

export interface IPayloadToken {
  id: string;
  user_id: string;
}
