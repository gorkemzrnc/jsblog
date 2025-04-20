export interface AuthParams {
  email: string;
  username: string;
  password: string;
}

export interface RegisterParams extends AuthParams { }

export interface LoginParams extends Omit<AuthParams, 'username'> { }