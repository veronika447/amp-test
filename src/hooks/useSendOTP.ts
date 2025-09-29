import { useMutation } from "@tanstack/react-query";
import type { SendOTPApiError, UseLoginProps } from "../types";
import { mockApi } from "../api/auth";

export function useSendOTP({ onSuccess, onError }: UseLoginProps) {
  return useMutation({
    mutationFn: mockApi.sendOTPCode,
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: SendOTPApiError) => {
      switch (error.code) {
        case "EXPIRED_CODE":
          onError("Invalid code");
          break;
        case "INVALID_CODE":
          onError("Invalid code");
          break;
      }
    },
  });
}
