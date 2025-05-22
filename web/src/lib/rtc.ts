type Message = {
  type: string;
  [key: string]: any;
};

const memberID = Math.floor(Math.random() * 100000);
console.log("MY MEMBER ID:", memberID);

const signaling = new BroadcastChannel("webrtc");
const postMessage = (message: any) => {
  signaling.postMessage({
    memberID,
    ...message,
  });
};

signaling.addEventListener("message", (e) => {
  const data = e.data;
  const { memberID, ...message } = data;
  console.log(`==> ${data.type} received from ${memberID}`);

  const type = message.type;
  switch (type) {
    case "member-joined":
      return startCall();
    case "offer":
      return handleOffer(message);
    case "answer":
      return handleAnswer(message);
    case "candidate":
      return handleCandidate(message);
    default:
      console.log("Unhandled message", e);
      break;
  }
});

interface Callbacks {
  setLocalStreamCb: (stream: MediaStream) => void;
  setRemoteStreamCb: (stream: MediaStream) => void;
}

let pc: RTCPeerConnection;
let localStream: MediaStream;
let callbacks: Callbacks;

const init = async (_callbacks: Callbacks) => {
  callbacks = _callbacks;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
    audio: true,
  });
  localStream = stream;
  callbacks.setLocalStreamCb(stream);

  postMessage({ type: "member-joined" });
};

const createPeerConnection = () => {
  pc = new RTCPeerConnection();

  pc.onicecandidate = (e) => {
    let message: Message = {
      type: "candidate",
      candidate: null,
    };
    if (e.candidate) {
      message.candidate = e.candidate.candidate;
      message.sdpMid = e.candidate.sdpMid;
      message.sdpMLineIndex = e.candidate.sdpMLineIndex;
    }

    postMessage(message);
  };

  localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
  pc.addEventListener("track", (e) => {
    callbacks.setRemoteStreamCb(e.streams[0]);
  });

  return pc;
};

const startCall = async () => {
  const pc1 = createPeerConnection();

  try {
    const offer = await pc1.createOffer();
    await pc1.setLocalDescription(offer);
    postMessage(offer);
  } catch (error) {
    console.log("Error create offer or set local description:", error);
  }
};

const handleOffer = async (offer: RTCSessionDescriptionInit) => {
  if (pc) {
    console.error("existing peerconnection");
    return;
  }

  const pc2 = createPeerConnection();

  try {
    await pc2.setRemoteDescription(offer);

    const answer = await pc2.createAnswer();
    await pc2.setLocalDescription(answer);
    postMessage(answer);
    // console.log("send answer complete");
  } catch (error) {
    console.log("Error create asnwer or set local description:", error);
  }
};

async function handleAnswer(answer: RTCSessionDescriptionInit) {
  if (!pc) {
    console.error("no peerconnection");
    return;
  }
  await pc.setRemoteDescription(answer);
}

const handleCandidate = async (candidate: RTCIceCandidateInit) => {
  if (!pc) {
    console.error("no peerconnection");
    return;
  }

  if (!candidate.candidate) {
    await pc.addIceCandidate(null);
    return;
  }
  await pc.addIceCandidate(candidate);
};

export { init };
