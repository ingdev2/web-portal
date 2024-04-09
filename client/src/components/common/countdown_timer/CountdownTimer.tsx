import React, { useEffect, useRef } from "react";
import { CountdownProps, Statistic } from "antd";

const { Countdown } = Statistic;

const CountdownTimer: React.FC<{
  onFinishHandler: () => void;
  showCountdown: boolean;
}> = ({ onFinishHandler, showCountdown }) => {
  const countdownTime = Date.now() + 30 * 1000;

  const countdownTimeRef = useRef(countdownTime);

  useEffect(() => {
    countdownTimeRef.current = countdownTime;
  }, [showCountdown]);

  const onFinish: CountdownProps["onFinish"] = () => {
    onFinishHandler();
  };

  return (
    <Countdown
      value={showCountdown ? countdownTimeRef.current : 0}
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
