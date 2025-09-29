import type {
  LoginApiError,
  LoginResponse,
  LoginPayload,
  SendOTPPayload,
  SendOTPResponse,
  SendOTPApiError,
} from "../types";

export const mockApi = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { email, password } = payload;

        if (email === "info@mail.com" && password === "123456") {
          resolve({
            token: "mock_token_123",
            user: {
              id: "1",
              email,
              name: "Demo User",
              role: "user",
            },
          });
        } else if (email === "info@mail.com") {
          reject({
            code: "INVALID_PASSWORD",
            message: "Invalid password",
          } as LoginApiError);
        } else if (email === "blocked@test.com") {
          reject({
            code: "USER_BLOCKED",
            message: "User blocked",
          } as LoginApiError);
        } else {
          reject({
            code: "SERVER_ERROR",
            message: "Server error",
          } as LoginApiError);
        }
      }, 1200);
    });
  },
  async sendOTPCode(payload: SendOTPPayload): Promise<SendOTPResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { code } = payload;

        if (code === "000000") {
          reject({
            code: "EXPIRED_CODE",
            message: "Code expired",
          } as SendOTPApiError);
        } else if (code !== "131311") {
          reject({
            code: "INVALID_CODE",
            message: "Code is invalid",
          } as SendOTPApiError);
        } else {
          resolve({ token: `fake-jwt-token`, success: true });
        }
      }, 800);
    });
  },
};
