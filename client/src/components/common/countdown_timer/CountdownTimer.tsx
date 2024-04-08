import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic;

const CountdownTimer: React.FC<{
  onFinishHandler: () => void;
  showCountdown: boolean;
}> = ({ onFinishHandler, showCountdown }) => {
  const [countdownKey, setCountdownKey] = useState(0);

  useEffect(() => {
    if (showCountdown) {
      setCountdownKey((prevKey) => prevKey + 1);
    }
  }, [showCountdown]);

  const handleFinish = () => {
    onFinishHandler();
  };

  return (
    <Countdown
      key={countdownKey}
      value={showCountdown ? Date.now() + 30 * 1000 : 0}
      onFinish={handleFinish}
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
