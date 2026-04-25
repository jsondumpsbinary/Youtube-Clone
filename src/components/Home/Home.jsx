

import { useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import CategoryPills from "../CategoryPills/CategoryPills";
import "./Home.css";



function Home({ onSelectVideo, allVideos }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const displayedVideos = allVideos.filter((video) => {
    if (activeCategory === "All") return true;
    return video.category === activeCategory;
  });

  return (
    <div className="home">
      <CategoryPills 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <div className="home__grid">
        {displayedVideos.length > 0 ? (
          displayedVideos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onSelectVideo={onSelectVideo}
            />
          ))
        ) : (
          <p className="home__no-videos">No videos found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
