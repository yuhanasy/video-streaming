import React from "react";
import Controls from "./controls";
import { PlayToggleContext } from "./play-toggle";
import { VolumeControlContext } from "./volume-control";
import { TimeContext } from "./time";
import { FullscreenToggleContext } from "./fullscreen-toggle";
import { SeekBarContext } from "./seek-bar";
import Loading from "./loading";

const VideoPlayer = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [isPlaying, setPlaying] = React.useState(true);
  const [volume, setVolume] = React.useState(1);
  const [isMuted, setMuted] = React.useState(true);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [bufferedTime, setBufferedTime] = React.useState(0);
  const [isFullscreen, setFullscreen] = React.useState(false);

  const playerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    let width = 0;
    let height = 0;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getVideoSize = () => {
      width = video.videoWidth;
      height = video.videoHeight;
    };

    const setCanvasSize = () => {
      canvas.width = width;
      canvas.height = height;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(video, 0, 0, width, height);
    };

    const timerCallback = () => {
      if (video.paused || video.ended) return;

      drawFrame();
      requestAnimationFrame(timerCallback);
    };

    video.addEventListener("loadeddata", () => {
      getVideoSize();
      setCanvasSize();

      video.play();
      setDuration(video.duration);
    });

    video.addEventListener("play", () => {
      getVideoSize();
      timerCallback();
    });
  }, []);

  const onProgress = () => {
    const video = videoRef.current;
    if (!video) return;

    const buffered = video.buffered;
    if (buffered.length < 0) return;

    const lastBufferedTime = buffered.end(buffered.length - 1);
    setLoading(lastBufferedTime < time);
    setBufferedTime(lastBufferedTime);
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
    return;
  };

  const onSeek = (position: number) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = position * duration;

    video.currentTime = newTime;
    setTime(newTime);
  };

  const onTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    setTime(video.currentTime);
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
                className="group/player relative overflow-hidden w-full flex items-center justify-center bg-black"
              >
                <video
                  ref={videoRef}
                  id="video"
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  crossOrigin="anonymous"
                  preload="auto"
                  autoPlay
                  playsInline
                  muted
                  className="hidden"
                  onTimeUpdate={onTimeUpdate}
                  onProgress={onProgress}
                />

                <canvas
                  ref={canvasRef}
                  id="video-canvas"
                  className="bg-black"
                  onClick={onTogglePlay}
                />

                <Loading isLoading={isLoading} />
                <Controls />
              </div>
            </FullscreenToggleContext.Provider>
          </TimeContext.Provider>
        </VolumeControlContext.Provider>
      </SeekBarContext.Provider>
    </PlayToggleContext.Provider>
  );
};

export default VideoPlayer;
