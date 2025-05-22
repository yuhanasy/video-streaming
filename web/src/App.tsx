import VideoPlayer from "@/components/video-player";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 p-4 text-center font-semibold">
        Canvas Video Player
      </div>
      <VideoPlayer
        src={`${API_URL}/video`}
        crossOrigin="anonymous"
        preload="auto"
        autoPlay
        controls
      />
    </div>
  );
}

export default App;
