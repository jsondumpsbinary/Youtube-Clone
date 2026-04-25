

import { useState } from "react";
import VideoCard from "../VideoCard/VideoCard";
import CategoryPills from "../CategoryPills/CategoryPills";
import "./Home.css";

const CATEGORY_DATA = {
  All: [
    { title: "Building a YouTube Clone with React", channel: "Code Antigravity", views: "1.2M", time: "2 days ago", dur: "15:24" },
    { title: "10 Life Hacks You Need", channel: "Daily Tips", views: "850K", time: "5 hours ago", dur: "8:12" },
    { title: "Ocean Documentary 2024", channel: "Nature Focus", views: "3.4M", time: "1 week ago", dur: "45:00" },
    { title: "Perfect Steak Tutorial", channel: "Chef Master", views: "2.1M", time: "3 days ago", dur: "12:45" },
    { title: "Top Travel Destinations", channel: "Wanderlust", views: "500K", time: "1 month ago", dur: "20:15" },
  ],
  React: [
    { title: "React Server Components Explained", channel: "JS Guru", views: "200K", time: "1 day ago", dur: "12:30" },
    { title: "Mastering useEffect in 10 Mins", channel: "React Dev", views: "450K", time: "4 days ago", dur: "10:00" },
    { title: "Next.js 15 vs 14: What's New?", channel: "Tech Today", views: "1.1M", time: "1 week ago", dur: "18:45" },
    { title: "Building a Chat App with React", channel: "Code Pro", views: "300K", time: "2 weeks ago", dur: "55:20" },
    { title: "React State Management in 2024", channel: "Frontend World", views: "150K", time: "3 hours ago", dur: "22:15" },
  ],
  JavaScript: [
    { title: "JS Closures Simply Explained", channel: "Logic Lab", views: "1.2M", time: "1 year ago", dur: "08:15" },
    { title: "Asynchronous JS: Async/Await", channel: "Code Pulse", views: "890K", time: "6 months ago", dur: "14:40" },
    { title: "10 JS Array Methods You Must Know", channel: "Dev School", views: "2.5M", time: "2 years ago", dur: "11:10" },
    { title: "Deep Dive into JS Event Loop", channel: "Web Ninja", views: "400K", time: "3 days ago", dur: "20:05" },
    { title: "JavaScript ES2024 New Features", channel: "Modern JS", views: "600K", time: "1 month ago", dur: "09:30" },
  ],
  Music: [
    { title: "Lofi Hip Hop Radio - Beats to Study", channel: "Lofi Girl", views: "450M", time: "Live", dur: "∞" },
    { title: "Top 50 Global Hits 2024", channel: "Music Charts", views: "12M", time: "1 week ago", dur: "3:45:00" },
    { title: "Classical Piano for Relaxation", channel: "Piano Haven", views: "5M", time: "2 years ago", dur: "1:30:00" },
    { title: "Acoustic Guitar Covers", channel: "Strings", views: "1.1M", time: "4 months ago", dur: "45:20" },
    { title: "EDM Festival Mix 2024", channel: "Bass Drop", views: "800K", time: "2 days ago", dur: "58:10" },
  ],
  Gaming: [
    { title: "Elden Ring: Shadow of the Erdtree", channel: "Game Lore", views: "2.3M", time: "5 days ago", dur: "25:40" },
    { title: "Top 10 Secret Bosses in Gaming", channel: "Ranker", views: "1.5M", time: "2 weeks ago", dur: "18:20" },
    { title: "Minecraft: 100 Days Hardcore", channel: "Block Master", views: "10M", time: "1 month ago", dur: "1:45:00" },
    { title: "GTA 6 - Official Trailer Breakdown", channel: "News Gamers", views: "45M", time: "6 months ago", dur: "12:15" },
    { title: "Fortnite Chapter 5 Highlights", channel: "Ninja Clan", views: "600K", time: "1 day ago", dur: "15:00" },
  ],
  News: [
    { title: "Global Summit 2024 Live Coverage", channel: "World News", views: "100K", time: "Live", dur: "4:00:00" },
    { title: "Tech Stocks Hit Record High", channel: "Finance Daily", views: "300K", time: "3 hours ago", dur: "08:45" },
    { title: "Breakthrough in Space Travel", channel: "Science Hub", views: "1.2M", time: "1 day ago", dur: "10:30" },
    { title: "Climate Change Report 2024", channel: "Earth Watch", views: "500K", time: "2 days ago", dur: "15:50" },
    { title: "Sports Update: Final Highlights", channel: "Sports Net", views: "900K", time: "6 hours ago", dur: "12:00" },
  ]
};

function Home({ onSelectVideo }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Helper to generate 30 cards for the active category
  const getVideosForCategory = (category) => {
    const templates = CATEGORY_DATA[category] || CATEGORY_DATA.All;
    return Array.from({ length: 30 }, (_, index) => {
      const template = templates[index % templates.length];
      return {
        id: `${category}-${index}`,
        thumbnail: `https://picsum.photos/seed/${category}${index}/360/202`,
        title: index >= templates.length ? `${template.title} (Vol. ${Math.floor(index / templates.length) + 1})` : template.title,
        channel: template.channel,
        channelAvatar: `https://i.pravatar.cc/150?u=${template.channel.replace(/\s/g, "")}`,
        views: template.views.includes("views") ? template.views : `${template.views} views`,
        uploadedAt: template.time,
        duration: template.dur
      };
    });
  };

  const displayedVideos = getVideosForCategory(activeCategory);

  return (
    <div className="home">
      <CategoryPills 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      <div className="home__grid">
        {displayedVideos.map((video) => (
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

