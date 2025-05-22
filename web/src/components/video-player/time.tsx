import React from "react";
import { formatTime } from "@/lib/utils";

type TimeContextValue = {
  currentTime: number;
  duration: number;
};

export const TimeContext = React.createContext<TimeContextValue | undefined>(
  undefined
);

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
