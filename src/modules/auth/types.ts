export type LoginRequest = {
  username: string;
  password: string;
};

export type RessetPassRequest = {
  email: string;
};

export type LoginResponse = {
  token: string;
};

export type ResetPassResponse = {
  status: string;
};
