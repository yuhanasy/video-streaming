import React from "react";

type TimeContextValue = {
  currentTime: number;
  duration: number;
};

export const TimeContext = React.createContext<TimeContextValue | undefined>(
  undefined
);

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const Time = () => {
  const context = React.useContext(TimeContext);
  if (!context) return null;
  const { currentTime, duration } = context;

  return (
    <div id="time" className="space-x-1 text-xs">
      <span>{formatTime(currentTime)}</span>
      <span>/</span>
      <span>{formatTime(duration)}</span>
    </div>
  );
};

export default Time;
