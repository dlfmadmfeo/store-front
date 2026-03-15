type LoginRequest = {
  userId: string;
  password: string;
};

type Payload ={
  address: string;
  name: string;
  email: string;
  phoneNum: string;
}

type LoginResponse = {
  success: boolean;
  message?: string;
  token?: string;
  payload: null | Payload;
};

export function mockLoginApi({ userId, password }: LoginRequest): Promise<LoginResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // mock 조건
      if (userId === "admin" && password === "0000") {
        resolve({
          success: true,
          token: "mock-jwt-token-123456",
          payload: {
            address: "서울특별시",
            name: "조준희",
            email: "junhee92kr@naver.com",
            phoneNum: "010-0000-0000"
          }
        });
      } else {
        resolve({
          success: false,
          message: "아이디 또는 비밀번호가 올바르지 않습니다.",
          payload: null,
        });
      }
    }, 500); // 네트워크 딜레이 느낌
  });
}
