import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./components/Home/Home";
import VideoDetail from "./components/VideoDetail/VideoDetail";
import History from "./components/History/History";
import Shorts from "./components/Shorts/Shorts";
import Library from "./components/Library/Library";
import "./App.css";

/* ── Format current time as "3:45 PM" ── */
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState("dark");

  // Global watch history — starts empty, only grows when user watches videos
  const [watchHistory, setWatchHistory] = useState([]);

  // Global video data fetched from videos.json
  const [allVideos, setAllVideos] = useState([]);

  // Fetch all videos once on mount
  useEffect(() => {
    async function fetchAllVideos() {
      try {
        const response = await fetch("/videos.json");
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data = await response.json();
        setAllVideos(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    }
    fetchAllVideos();
  }, []);

  // Apply theme to <html> so every element including body picks it up
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  function onAddToHistory(video) {
    const entry = {
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      channel: video.channel,
      channelAvatar: video.channelAvatar,
      views: video.views || "Shorts",
      duration: video.duration || "0:15",
      watchedAt: "Today",
      watchedTime: getCurrentTime(),
      progress: 0,
    };

    setWatchHistory((prev) => {
      const filtered = prev.filter((v) => v.id !== video.id);
      return [entry, ...filtered];
    });
  }

  function handleSelectVideo(video) {
    onAddToHistory(video);
    setSelectedVideo(video);
    setCurrentPage("video");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleGoHome() {
    setSelectedVideo(null);
    setCurrentPage("home");
  }

  function handleNavigate(page) {
    setCurrentPage(page);
    setSelectedVideo(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPage() {
    if (currentPage === "history") {
      return (
        <History
          history={watchHistory}
          setHistory={setWatchHistory}
        />
      );
    }
    if (currentPage === "shorts") {
      return <Shorts onAddToHistory={onAddToHistory} />;
    }
    if (currentPage === "library") {
      return <Library />;
    }
    if (currentPage === "video" && selectedVideo !== null) {
      return (
        <VideoDetail
          video={selectedVideo}
          onGoHome={handleGoHome}
          onSelectVideo={handleSelectVideo}
          allVideos={allVideos}
        />
      );
    }
    return (
      <Home 
        onSelectVideo={handleSelectVideo} 
        allVideos={allVideos}
      />
    );
  }

  return (
    <div className="app">
      <Navbar
        onToggleSidebar={handleToggleSidebar}
        onGoHome={handleGoHome}
        theme={theme}
        onThemeChange={setTheme}
      />

      <div className="app__body">
        <Sidebar
          isOpen={sidebarOpen}
          onNavigate={handleNavigate}
          activePage={currentPage}
        />

        <main
          className={`app__content ${sidebarOpen ? "app__content--shifted" : "app__content--full"}`}
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
