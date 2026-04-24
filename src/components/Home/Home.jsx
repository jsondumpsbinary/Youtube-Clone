// ============================================================
// DEVELOPER 2 — Home.jsx
// Fetches videos from /videos.json using useEffect + fetch
// Stores in useState, maps over data to render VideoCard grid
// Props: onSelectVideo (function passed down from App.jsx)
// ============================================================

import { useState, useEffect } from "react";
import VideoCard from "../VideoCard/VideoCard";
import CategoryPills from "../CategoryPills/CategoryPills";
import "./Home.css";

function Home({ onSelectVideo }) {
  // Holds the array of video objects fetched from videos.json
  const [videos, setVideos] = useState([]);

  // Tracks loading state so we can show a spinner
  const [loading, setLoading] = useState(true);

  // Tracks any fetch error
  const [error, setError] = useState(null);

  // useEffect runs once after the component mounts
  useEffect(() => {
    // Async function inside useEffect is a common pattern
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);

        // Fetch mock data from the public folder
        const response = await fetch("/videos.json");

        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to fetch videos:", err);
        setError("Oops! Could not load videos. Please try again.");
      } finally {
        // Always turn off loading, whether success or failure
        setLoading(false);
      }
    }

    fetchVideos();
  }, []); // Empty dependency array = run only once on mount

  // ── Render: Loading State ──
  if (loading) {
    return (
      <div className="home">
        <CategoryPills />
        <div className="home__skeleton-grid">
          {/* Show 8 skeleton cards while loading */}
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

  // ── Render: Error State ──
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

  // ── Render: Video Grid ──
  return (
    <div className="home">
      <CategoryPills />
      <div className="home__grid">
        {videos.map((video) => (
          // Pass the onSelectVideo prop into each VideoCard
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
