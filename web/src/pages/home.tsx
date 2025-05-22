import VideoPlayer from "@/components/video-player";

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  return (
    <VideoPlayer
      src={`${API_URL}/video`}
      crossOrigin="anonymous"
      preload="auto"
      autoPlay
      controls
      overlay
    />
  );
};

export default HomePage;
