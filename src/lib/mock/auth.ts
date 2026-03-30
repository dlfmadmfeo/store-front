import type { LoginResponse } from "@/lib/types/auth";

export const mockAdminLoginResponse: LoginResponse = {
  success: true,
  token: "mock-jwt-token-123456",
  payload: {
    id: "admin",
    address: "\uC11C\uC6B8 \uAC15\uB0A8\uAD6C",
    name: "\uC870\uC900\uD76C",
    email: "junhee92kr@naver.com",
    phoneNum: "010-0000-0000",
  },
};
