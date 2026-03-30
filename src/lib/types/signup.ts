export type SignupRequest = {
  userId: string;
  password: string;
  email?: string;
  name: string;
  birthDate: string;
  gender: "male" | "female" | "none";
  phone: string;
  countryCode: string;
};

export type SignupResponse = {
  success: boolean;
  message: string;
};
