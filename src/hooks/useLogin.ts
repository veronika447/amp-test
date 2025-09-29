import { useMutation } from "@tanstack/react-query";
import { mockApi } from "../api/auth";
import type { LoginApiError, UseLoginProps } from "../types";

export function useLogin({ onSuccess, onError }: UseLoginProps) {
  return useMutation({
    mutationFn: mockApi.login,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: LoginApiError) => {
      switch (error.code) {
        case "INVALID_PASSWORD":
          onError("Invalid password");
          break;
        case "USER_BLOCKED":
          onError("User blocked");
          break;
        case "SERVER_ERROR":
          onError("Server error");
          break;
        default:
          onError("Unknown error");
      }
    },
  });
}
