import VideoPlayer from "@/components/video-player";
import { useEffect, useState } from "react";

const signaling = new BroadcastChannel("webrtc");

signaling.addEventListener("message", (e) => {
  const message = e.data;
  const type = message.type;

  switch (type) {
    case "offer":
    case "answer":
    case "candidate":
    default:
      console.log("Unhandled message", e);
      break;
  }
});

const init = async (setLocalStream: (stream: MediaStream) => void) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  setLocalStream(stream);
};

const MeetingsPage = () => {
  const [localStream, setLocalStream] = useState<MediaStream>();

  useEffect(() => {
    init((stream) => {
      setLocalStream(stream);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <VideoPlayer id="me" srcObject={localStream} autoPlay playsInline />
      <VideoPlayer id="friend" autoPlay playsInline />
    </div>
  );
};

export default MeetingsPage;
