import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import VideoDetail from "./components/VideoDetail/VideoDetail";
import "./App.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [selectedVideo, setSelectedVideo] = useState(null);

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function handleSelectVideo(video) {
    setSelectedVideo(video);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleGoHome() {
    setSelectedVideo(null);
  }

  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggleSidebar} onGoHome={handleGoHome} />

      <div className="app__body">

        <Sidebar isOpen={sidebarOpen} />

        <main
          className={`app__content ${sidebarOpen ? "app__content--shifted" : "app__content--full"}`}
        >
          {selectedVideo === null ? (

            <Home onSelectVideo={handleSelectVideo} />
          ) : (

            <VideoDetail
              video={selectedVideo}
              onGoHome={handleGoHome}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

