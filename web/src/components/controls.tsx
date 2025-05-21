import FullscreenToggle from "./fullscreen-toggle";
import PlayToggle from "./play-toggle";
import SeekBar from "./seek-bar";
import Time from "./time";
import VolumeControl from "./volume-control";

const Controls = () => {
  return (
    <div
      id="controls-container"
      // className="absolute -bottom-16 opacity-0 group-hover/player:bottom-0 group-hover/player:opacity-100 left-0 right-0 w-full px-2 py-2 bg-gradient-to-t from-black/80 to-black/0 min-h-10 text-white text-sm space-y-1 transition-all ease-in-out"
      className="absolute -bottom-0 opacity-100 group-hover/player:bottom-0 group-hover/player:opacity-100 left-0 right-0 w-full px-2 py-2 bg-gradient-to-t from-black/80 to-black/0 min-h-10 text-white text-sm space-y-1 transition-all ease-in-out"
    >
      <SeekBar />

      <div id="controls" className="flex items-center justify-between">
        <div id="left" className="flex items-center">
          <PlayToggle />
          <VolumeControl />
        </div>

        <div id="right" className="flex items-center">
          <Time />
          <FullscreenToggle />
        </div>
      </div>
    </div>
  );
};

export default Controls;
