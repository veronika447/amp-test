export type StepProps = {
  onClick: () => void;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type LoginApiError = {
  code: "INVALID_PASSWORD" | "USER_BLOCKED" | "SERVER_ERROR" | "UNKNOWN";
  message: string;
  details?: Record<string, string>;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SendOTPPayload = { code: string };

export type SendOTPResponse = { token: string; success: boolean };

export type SendOTPApiError = {
  code: "EXPIRED_CODE" | "INVALID_CODE";
  message: string;
  details?: Record<string, string>;
};

export type UseLoginProps = {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
};
