export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  needsPasswordChange: boolean;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
