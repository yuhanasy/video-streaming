import { useEffect, useState } from "react";
import PeerWebRtc from "@/components/peer-webrtc";
import { init, onLeave } from "@/lib/rtc";

const MeetingsPage = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();

  useEffect(() => {
    init({
      setLocalStreamCb: (stream) => setLocalStream(stream),
      setRemoteStreamCb: (stream) => setRemoteStream(stream),
      leaveRoom: () => setRemoteStream(undefined),
    });

    return () => {
      setRemoteStream(undefined);
      onLeave();
    };
  }, []);

  return <PeerWebRtc localStream={localStream} remoteStream={remoteStream} />;
};

export default MeetingsPage;
