export type LoginRequest = {
  userId: string;
  password: string;
};

export type LoginPayload = {
  id: string;
  address: string;
  name: string;
  email: string;
  phoneNum: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  token?: string;
  payload: null | LoginPayload;
};
