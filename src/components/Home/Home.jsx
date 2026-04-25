

import { useState, useEffect } from "react";
import VideoCard from "../VideoCard/VideoCard";
import CategoryPills from "../CategoryPills/CategoryPills";
import "./Home.css";

function Home({ onSelectVideo }) {

  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/videos.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setError("Oops! Could not load videos. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <CategoryPills />
        <div className="home__skeleton-grid">
          {/* 8 cards while loading */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="home__skeleton-card">
              <div className="skeleton skeleton--thumb" />
              <div className="home__skeleton-info">
                <div className="skeleton skeleton--avatar" />
                <div className="home__skeleton-text">
                  <div className="skeleton skeleton--line skeleton--line-lg" />
                  <div className="skeleton skeleton--line skeleton--line-md" />
                  <div className="skeleton skeleton--line skeleton--line-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <CategoryPills />
        <div className="home__error">
          <span className="home__error-icon">⚠️</span>
          <p>{error}</p>
          <button className="home__retry-btn" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <CategoryPills />
      <div className="home__grid">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onSelectVideo={onSelectVideo}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
