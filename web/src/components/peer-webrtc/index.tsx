import { PhoneOffIcon } from "lucide-react";
import { Link } from "react-router";
import VideoPlayer from "@/components/video-player";
import { cn } from "@/lib/utils";

type PeerWebRtcProps = {
  localStream?: MediaStream;
  remoteStream?: MediaStream;
};

const PeerWebRtc = ({ localStream, remoteStream }: PeerWebRtcProps) => {
  return (
    <div className="relative p-4 h-full flex items-center justify-center">
      <div
        className={cn(
          "transition-all ease-linear",
          remoteStream
            ? "absolute w-[25vw] bottom-8 right-8 z-10"
            : "w-full h-full"
        )}
      >
        <div
          className={cn(
            "relative",
            remoteStream
              ? "border-4 rounded-2xl border-black/10 overflow-hidden"
              : ""
          )}
        >
          <VideoPlayer
            id="local"
            srcObject={localStream}
            autoPlay
            playsInline
          />
          <span className="absolute bottom-0 right-0 text-sm p-2 bg-black/10">
            Local Stream
          </span>
        </div>
      </div>
      {remoteStream ? (
        <div className="relative w-full h-full">
          <VideoPlayer
            id="remote"
            srcObject={remoteStream}
            autoPlay
            playsInline
          />
          <span className="absolute top-0 left-0 text-sm p-2 bg-black/10">
            Remote Stream
          </span>
        </div>
      ) : null}

      <div className="absolute bottom-8 inset-x-auto">
        <Link to="/" aria-label="leave room">
          <div className="p-4 rounded-full bg-red-600">
            <PhoneOffIcon size={24} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PeerWebRtc;
