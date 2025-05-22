import React from "react";
import Slider from "@/components/ui/slider";

type SeekBarContextValue = {
  duration: number;
  currentTime: number;
  bufferedTime: number;
  onSeek: (position: number) => void;
};

export const SeekBarContext = React.createContext<
  SeekBarContextValue | undefined
>(undefined);

const SeekBar = () => {
  const context = React.useContext(SeekBarContext);
  if (!context) return null;
  const { duration, currentTime, bufferedTime, onSeek } = context;

  return (
    <Slider
      variant="withHover"
      position={currentTime / duration}
      bufferedPosition={bufferedTime / duration}
      onClick={onSeek}
    />
  );
};

export default SeekBar;
