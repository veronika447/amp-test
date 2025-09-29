import { useEffect, useState, type FC } from "react";
import { Button, Flex, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { StepProps } from "../types";
import { useSendOTP } from "../hooks/useSendOTP";
import { InputOTP } from "antd-input-otp";

const { Title, Text } = Typography;

export const OTPStep: FC<StepProps> = ({ onClick }) => {
  const [otp, setOtp] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const timerActive = secondsLeft > 0;
  const [continueButtonActive, setContinueButtonActive] =
    useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const handleFinish = (values: string[]) => {
    const payload = (values || otp).join("");
    setContinueButtonActive(true);
    setSecondsLeft(0);
    mutate({ code: payload });
  };

  const onSuccess = () => {};

  const onError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
  };

  const { mutate, isPending } = useSendOTP({
    onSuccess: onSuccess,
    onError: onError,
  });

  const inputBorderColor = errorMessage ? "red" : "#D9D9D9";

  return (
    <Flex vertical align="center">
      <Button
        type="text"
        style={{
          position: "absolute",
          top: "28px",
          left: "32px",
          width: "40px",
          height: "40px",
        }}
        onClick={onClick}
      >
        <ArrowLeftOutlined />
      </Button>
      <Title
        level={3}
        style={{ textAlign: "center", height: "32px", marginBottom: "4px" }}
      >
        Two-Factor Authentication
      </Title>
      <Text style={{ textAlign: "center", marginBottom: "24px" }}>
        Enter the 6-digit code from the Google Authenticator app
      </Text>
      <InputOTP
        value={otp}
        onChange={setOtp}
        autoSubmit={handleFinish}
        inputType="numeric"
        inputStyle={{
          borderColor: inputBorderColor,
          height: "60px",
          maxWidth: "52px",
        }}
      />
      {errorMessage && (
        <Text style={{ color: "red", alignSelf: "flex-start" }}>
          {errorMessage}
        </Text>
      )}
      {continueButtonActive && (
        <Button
          size="large"
          type="primary"
          block
          disabled={isPending || !!errorMessage}
          style={{ marginTop: "16px" }}
        >
          Continue
        </Button>
      )}
      {!continueButtonActive &&
        (timerActive ? (
          <Text style={{ opacity: "65%", marginTop: "16px" }}>
            Get a new code in 00:{secondsLeft.toString().padStart(2, "0")}
          </Text>
        ) : (
          <Button
            type="primary"
            size="large"
            block
            onClick={() => setSecondsLeft(60)}
            style={{ marginTop: "16px" }}
          >
            Get new
          </Button>
        ))}
    </Flex>
  );
};
