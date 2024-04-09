import React, { useEffect, useRef, useState } from "react";
import { CountdownProps, Statistic } from "antd";

const { Countdown } = Statistic;

const CountdownTimer: React.FC<{
  onFinishHandler: () => void;
  showCountdown: boolean;
}> = ({ onFinishHandler, showCountdown }) => {
  const initialCountdownTime = 30;

  const countdownTimeRef = useRef(initialCountdownTime);

  const [countdownTime, setCountdownTime] = useState(initialCountdownTime);

  useEffect(() => {
    if (showCountdown) {
      setCountdownTime(initialCountdownTime);
      countdownTimeRef.current = initialCountdownTime;
    }
  }, [showCountdown]);

  const onFinish: CountdownProps["onFinish"] = () => {
    onFinishHandler();
    setCountdownTime(initialCountdownTime);
    countdownTimeRef.current = initialCountdownTime;
  };

  return (
    <Countdown
      value={showCountdown ? Date.now() + countdownTimeRef.current * 1000 : 0}
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
