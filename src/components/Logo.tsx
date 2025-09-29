import Icon from "@ant-design/icons";
import { Flex, Typography, type GetProps } from "antd";
import type { FC } from "react";

type CustomIconComponentProps = GetProps<typeof Icon>;

const { Title } = Typography;

const LogoSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
  >
    <path
      d="M12.8789 0C19.5063 0 24.8789 5.37258 24.8789 12C24.8789 18.6274 19.5063 24 12.8789 24C6.25149 24 0.878906 18.6274 0.878906 12C0.878906 5.37258 6.25149 0 12.8789 0ZM12.8789 6C9.5652 6 6.87891 8.68629 6.87891 12C6.87891 15.3137 9.5652 18 12.8789 18C16.1926 18 18.8789 15.3137 18.8789 12C18.8789 8.68629 16.1926 6 12.8789 6Z"
      fill="#1677FF"
    />
  </svg>
);

const LogoIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LogoSvg} {...props} />
);

export const Logo: FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      gap="small"
      style={{ height: "64px" }}
    >
      <LogoIcon />
      <Title level={5} style={{ margin: "0" }}>
        Company
      </Title>
    </Flex>
  );
};
