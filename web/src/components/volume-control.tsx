import React from "react";
import { Volume2Icon, VolumeOffIcon } from "lucide-react";
import Slider from "./ui/slider";

type VolumeControlContextValue = {
  volume: number;
  isMuted: boolean;
  onToggleVolume: () => void;
  onVolumeChange: (newVolume: number) => void;
};

export const VolumeControlContext = React.createContext<
  VolumeControlContextValue | undefined
>(undefined);

const VolumeControl = () => {
  const context = React.useContext(VolumeControlContext);
  if (!context) return null;
  const { volume, isMuted, onToggleVolume, onVolumeChange } = context;

  return (
    <div id="volume" className="group flex items-center">
      <button
        type="button"
        id="volume-toggle"
        className="group/control-btn px-4 py-2 text-white/80 hover:text-white transition-all ease-in-out"
        onClick={onToggleVolume}
      >
        {isMuted ? (
          <VolumeOffIcon
            size={16}
            className="group-hover/control-btn:scale-110"
          />
        ) : (
          <Volume2Icon
            size={16}
            className="group-hover/control-btn:scale-110"
          />
        )}
      </button>

      <Slider
        position={isMuted ? 0 : volume}
        onClick={onVolumeChange}
        className="w-0 group-hover:w-40 py-2 pr-4 pl-1 opacity-0 group-hover:opacity-100  transition-all ease-in-out"
      />
    </div>
  );
};

export default VolumeControl;
