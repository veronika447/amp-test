import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Typography,
  type FormInstance,
} from "antd";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import type { StepProps } from "../types";
import { useLogin } from "../hooks/useLogin";

const { Title } = Typography;

type SubmitButtonProps = {
  form: FormInstance;
  isPending: boolean;
};

const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = ({
  form,
  isPending,
  children,
}) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable || isPending}
      block
      size="large"
    >
      {children}
    </Button>
  );
};

export const AuthStep: FC<StepProps> = ({ onClick }) => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onError = (errorMessage: string) => {
    messageApi.open({
      type: "error",
      content: errorMessage,
    });
  };

  const { mutate, isPending } = useLogin({
    onSuccess: onClick,
    onError: onError,
  });

  return (
    <>
      {contextHolder}
      <Title
        level={3}
        style={{
          textAlign: "center",
          textWrap: "wrap",
          marginTop: "4px",
          marginBottom: "24px",
          height: "64px",
        }}
      >
        Sign in to your account to continue
      </Title>
      <Form
        form={form}
        name="login"
        onFinish={(values) => mutate(values)}
        layout="vertical"
        disabled={isPending}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Incorrect email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ opacity: "45%" }} />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockFilled style={{ opacity: "45%" }} />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item label={null} style={{ marginBottom: "0" }}>
          <SubmitButton form={form} isPending={isPending}>
            Log in
          </SubmitButton>
        </Form.Item>
      </Form>
    </>
  );
};
