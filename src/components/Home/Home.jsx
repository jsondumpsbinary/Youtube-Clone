

import VideoCard from "../VideoCard/VideoCard";
import CategoryPills from "../CategoryPills/CategoryPills";
import "./Home.css";

const VIDEO_DATA = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/seed/yt1/360/202",
    title: "Building a YouTube Clone with React and CSS",
    channel: "Code with Antigravity",
    channelAvatar: "https://i.pravatar.cc/150?u=antigravity",
    views: "1.2M views",
    uploadedAt: "2 days ago",
    duration: "15:24"
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/seed/yt2/360/202",
    title: "10 Life Hacks You Didn't Know You Needed",
    channel: "Daily Tips",
    channelAvatar: "https://i.pravatar.cc/150?u=dailytips",
    views: "850K views",
    uploadedAt: "5 hours ago",
    duration: "8:12"
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/seed/yt3/360/202",
    title: "Exploring the Deep Ocean - Documentary",
    channel: "Nature Focus",
    channelAvatar: "https://i.pravatar.cc/150?u=nature",
    views: "3.4M views",
    uploadedAt: "1 week ago",
    duration: "45:00"
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/seed/yt4/360/202",
    title: "How to Cook the Perfect Steak every time",
    channel: "Chef Master",
    channelAvatar: "https://i.pravatar.cc/150?u=chef",
    views: "2.1M views",
    uploadedAt: "3 days ago",
    duration: "12:45"
  },
  {
    id: "5",
    thumbnail: "https://picsum.photos/seed/yt5/360/202",
    title: "Top 10 Travel Destinations for 2024",
    channel: "Wanderlust",
    channelAvatar: "https://i.pravatar.cc/150?u=travel",
    views: "500K views",
    uploadedAt: "1 month ago",
    duration: "20:15"
  },
  {
    id: "6",
    thumbnail: "https://picsum.photos/seed/yt6/360/202",
    title: "SpaceX Starship Launch - Full Coverage",
    channel: "Space News",
    channelAvatar: "https://i.pravatar.cc/150?u=space",
    views: "10M views",
    uploadedAt: "12 hours ago",
    duration: "2:30:00"
  },
  {
    id: "7",
    thumbnail: "https://picsum.photos/seed/yt7/360/202",
    title: "Yoga for Beginners - 20 Minute Home Workout",
    channel: "Zen Life",
    channelAvatar: "https://i.pravatar.cc/150?u=yoga",
    views: "4.2M views",
    uploadedAt: "2 years ago",
    duration: "22:10"
  },
  {
    id: "8",
    thumbnail: "https://picsum.photos/seed/yt8/360/202",
    title: "The Future of AI - What to Expect",
    channel: "Tech Insider",
    channelAvatar: "https://i.pravatar.cc/150?u=tech",
    views: "1.5M views",
    uploadedAt: "4 days ago",
    duration: "18:30"
  },
  {
    id: "9",
    thumbnail: "https://picsum.photos/seed/yt9/360/202",
    title: "Classical Music for Studying and Concentration",
    channel: "Music Oasis",
    channelAvatar: "https://i.pravatar.cc/150?u=music",
    views: "12M views",
    uploadedAt: "6 months ago",
    duration: "3:00:00"
  },
  {
    id: "10",
    thumbnail: "https://picsum.photos/seed/yt10/360/202",
    title: "Minimalist Room Tour - Aesthetic Workspace",
    channel: "Design Vibes",
    channelAvatar: "https://i.pravatar.cc/150?u=design",
    views: "900K views",
    uploadedAt: "3 weeks ago",
    duration: "10:05"
  }
];

// Duplicate the data to reach 30 items with slightly varied titles for realism
const extendedVideos = Array.from({ length: 30 }, (_, index) => {
  const template = VIDEO_DATA[index % VIDEO_DATA.length];
  return {
    ...template,
    id: `${index + 1}`,
    title: index >= 10 ? `${template.title} (Part ${Math.floor(index / 10) + 1})` : template.title,
    thumbnail: `https://picsum.photos/seed/yt${index + 1}/360/202`,
  };
});

function Home({ onSelectVideo }) {
  return (
    <div className="home">
      <CategoryPills />
      <div className="home__grid">
        {extendedVideos.map((video) => (
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

