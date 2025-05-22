import React from "react";
import Controls from "./controls";
import { PlayToggleContext } from "./play-toggle";
import { VolumeControlContext } from "./volume-control";
import { TimeContext } from "./time";
import { FullscreenToggleContext } from "./fullscreen-toggle";
import { SeekBarContext } from "./seek-bar";
import Loading from "./loading";
import Error from "./error";
import { formatTime } from "@/lib/utils";

interface VideoPlayerProps
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  srcObject?: MediaProvider | null | undefined;
  overlay?: boolean;
}

const VideoPlayer = ({ srcObject, overlay, ...props }: VideoPlayerProps) => {
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(!!props.autoPlay);

  const [volume, setVolume] = React.useState(1);
  const [isMuted, setMuted] = React.useState(!!props.muted || !!props.autoPlay);

  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [bufferedTime, setBufferedTime] = React.useState(0);

  const [isFullscreen, setFullscreen] = React.useState(false);

  const playerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!srcObject || !videoRef.current) return;
    videoRef.current.srcObject = srcObject;
  }, [srcObject]);

  const onLoadedData = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    if (props.autoPlay) {
      video.play();
      setDuration(video.duration);
    }
  };

  const onPlay = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const width = video.videoWidth;
    const height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(video, 0, 0, width, height);

      if (overlay) {
        ctx.font = "50px sans serif";
        ctx.fillStyle = "white";
        ctx.fillText(
          formatTime(video.currentTime).toString(),
          width / 2 - 50,
          height / 2
        );
      }

      requestAnimationFrame(drawFrame);
    };

    if (video.paused || video.ended) return;
    drawFrame();
  };

  const onWaiting = () => {
    setLoading(true);
  };

  const onPlaying = () => {
    setLoading(false);
  };

  const onEnded = () => {
    setLoading(false);
    setPlaying(false);
  };

  const onError = () => {
    setError(true);
    setPlaying(false);
  };

  const onProgress = () => {
    const video = videoRef.current;
    if (!video) return;

    const buffered = video.buffered;
    if (buffered.length < 1) return;

    const lastBufferedTime = buffered.end(buffered.length - 1);
    setBufferedTime(lastBufferedTime);
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setTime(video.currentTime);
  };

  const onTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setPlaying(true);
      return;
    }

    video.pause();
    setPlaying(false);
  };

  const onSeek = (position: number) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = position * duration;

    video.currentTime = newTime;
    setTime(newTime);
  };

  const onToggleVolume = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  const onVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || newVolume === 0) {
      onToggleVolume();
    }

    video.volume = newVolume;
    setVolume(newVolume);
  };

  const onToggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;
    if (!document.fullscreenElement) {
      player
        .requestFullscreen()
        .then(() => {
          setFullscreen(true);
        })
        .catch((err) => {
          console.error(
            `Error attempting to enable fullscreen: ${err.message}`
          );
        });
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <PlayToggleContext.Provider value={{ isPlaying, onTogglePlay }}>
      <SeekBarContext.Provider
        value={{ currentTime: time, bufferedTime, duration, onSeek }}
      >
        <VolumeControlContext.Provider
          value={{ volume, isMuted, onToggleVolume, onVolumeChange }}
        >
          <TimeContext.Provider value={{ currentTime: time, duration }}>
            <FullscreenToggleContext.Provider
              value={{ isFullscreen, onToggleFullscreen }}
            >
              <div
                ref={playerRef}
                id="video-player-container"
                className="group/player relative overflow-hidden w-full max-h-[80vh] flex items-center justify-center bg-black"
              >
                <video
                  ref={videoRef}
                  id="video"
                  className="hidden"
                  onLoadedData={onLoadedData}
                  onProgress={onProgress}
                  onPlay={onPlay}
                  onTimeUpdate={onTimeUpdate}
                  onPlaying={onPlaying}
                  onWaiting={onWaiting}
                  onEnded={onEnded}
                  onError={onError}
                  {...props}
                  autoPlay={props.autoPlay}
                  muted={props.muted || props.autoPlay}
                />

                <canvas
                  ref={canvasRef}
                  id="video-canvas"
                  className="bg-black w-full"
                  onClick={onTogglePlay}
                />

                {props.controls && <Controls />}

                <Loading isLoading={isLoading} />
                <Error isError={isError} />
              </div>
            </FullscreenToggleContext.Provider>
          </TimeContext.Provider>
        </VolumeControlContext.Provider>
      </SeekBarContext.Provider>
    </PlayToggleContext.Provider>
  );
};

export default VideoPlayer;
