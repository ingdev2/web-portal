import React from "react";
import { CountdownProps, Statistic } from "antd";

const { Countdown } = Statistic;

const CountdownTimer: React.FC<{
  onFinishHandler: () => void;
  showCountdown: boolean;
}> = ({ onFinishHandler, showCountdown }) => {
  const initialCountdownTime = Number(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER);

  const onFinish: CountdownProps["onFinish"] = () => {
    onFinishHandler();
  };

  return (
    <Countdown
      value={showCountdown ? Date.now() + initialCountdownTime * 1000 : 0}
      onFinish={onFinish}
      format="mm:ss"
      valueStyle={{
        fontSize: 22,
        fontWeight: "bold",
        color: showCountdown ? "#960202" : "#137A2B",
      }}
    />
  );
};

export default CountdownTimer;
