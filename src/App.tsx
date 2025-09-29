import { useState, type FC } from "react";
import { OTPStep } from "./components/OTPStep";
import { AuthStep } from "./components/AuthStep";
import { Logo } from "./components/Logo";
import { Card, ConfigProvider, Flex } from "antd";

export const App: FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            fontWeightStrong: 600,
            fontSizeHeading3: 24,
            fontSizeHeading5: 12,
            fontSize: 16,
            margin: 0,
          },
          Form: {
            itemMarginBottom: 16,
          },
        },
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{ height: "100vh", backgroundColor: "#F5F5F5" }}
      >
        <Card style={{ width: "440px", borderRadius: "6px", padding: "8px" }}>
          <Logo />
          {current === 0 && <AuthStep onClick={next} />}
          {current === 1 && <OTPStep onClick={prev} />}
        </Card>
      </Flex>
    </ConfigProvider>
  );
};
