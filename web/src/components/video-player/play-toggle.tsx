import React from "react";
import { PauseIcon, PlayIcon } from "lucide-react";

type PlayToggleContextValue = {
  isPlaying: boolean;
  onTogglePlay: () => void;
};

export const PlayToggleContext = React.createContext<
  PlayToggleContextValue | undefined
>(undefined);

const PlayToggle = () => {
  const context = React.useContext(PlayToggleContext);
  if (!context) return null;
  const { isPlaying, onTogglePlay } = context;

  return (
    <button
      type="button"
      id="play-btn"
      className="group/control-btn px-4 py-2 text-white/80 hover:text-white transition-all ease-in-out"
      onClick={onTogglePlay}
    >
      {isPlaying ? (
        <PauseIcon size={16} className="group-hover/control-btn:scale-110" />
      ) : (
        <PlayIcon size={16} className="group-hover/control-btn:scale-110" />
      )}
    </button>
  );
};

export default PlayToggle;
