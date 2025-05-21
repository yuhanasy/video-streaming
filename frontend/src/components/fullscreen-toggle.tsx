import { MaximizeIcon, MinimizeIcon } from "lucide-react";
import React from "react";

type FullscreenToggleContextValue = {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
};

export const FullscreenToggleContext = React.createContext<
  FullscreenToggleContextValue | undefined
>(undefined);

const FullscreenToggle = () => {
  const context = React.useContext(FullscreenToggleContext);
  if (!context) return null;
  const { isFullscreen, onToggleFullscreen } = context;

  return (
    <button
      type="button"
      id="fullscreen-toggle"
      className="group/control-btn px-4 py-2 text-white/80 hover:text-white transition-all ease-in-out"
      onClick={onToggleFullscreen}
    >
      {isFullscreen ? (
        <MinimizeIcon size={16} className="group-hover/control-btn:scale-110" />
      ) : (
        <MaximizeIcon size={16} className="group-hover/control-btn:scale-110" />
      )}
    </button>
  );
};

export default FullscreenToggle;
