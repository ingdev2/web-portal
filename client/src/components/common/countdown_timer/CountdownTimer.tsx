"use client";

import React, { useRef } from "react";

const { Countdown } = Statistic;
import { CountdownProps, Statistic } from "antd";

const CountdownTimer: React.FC<{
  onFinishHandler: () => void;
  showCountdown: boolean;
}> = ({ onFinishHandler, showCountdown }) => {
  const countdownTime = Number(process.env.NEXT_PUBLIC_COUNTDOWN_TIMER);

  const initialCountdownTime = useRef(Date.now() + countdownTime * 1000);

  const zeroTime = 0;

  const onFinish: CountdownProps["onFinish"] = () => {
    onFinishHandler();
  };

  return (
    <Countdown
      value={showCountdown ? initialCountdownTime.current : zeroTime}
      onFinish={onFinish}
      format="mm:ss"
      valueStyle={{
        fontSize: 27,
        fontWeight: "bold",
        color: showCountdown ? "#960202" : "#137A2B",
      }}
    />
  );
};

export default CountdownTimer;
