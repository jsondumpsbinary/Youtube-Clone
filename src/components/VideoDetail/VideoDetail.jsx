import VideoActions from "../VideoActions/VideoActions";
import Comments from "../Comments/Comments";
import "./VideoDetail.css";

function VideoDetail({ video, onGoHome, onSelectVideo, allVideos }) {
  // Use allVideos for suggestions, filtering out the current video
  const suggestedVideos = allVideos
    .filter((v) => v.id !== video.id)
    .slice(0, 10); // Show up to 10 suggestions


  return (
    <div className="video-detail">
      <button className="video-detail__back" onClick={onGoHome} aria-label="Go back to home">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        Back to Home
      </button>

      <div className="video-detail__layout">
        <div className="video-detail__main">
          <div className="video-detail__player-container">
            <video
              className="video-detail__player"
              controls
              autoPlay
              poster={video.thumbnail}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          <h1 className="video-detail__title">{video.title}</h1>

          <div className="video-detail__meta-row">
            <div className="video-detail__channel-info">
              <img
                className="video-detail__channel-avatar"
                src={video.channelAvatar || `https://i.pravatar.cc/150?u=${video.channel}`}
                alt={video.channel}
              />
              <div>
                <p className="video-detail__channel-name">{video.channel}</p>
                <p className="video-detail__subscribers">
                  {video.subscribers || "1.2M"} subscribers
                </p>
              </div>
            </div>
            <button className="video-detail__subscribe-btn">Subscribe</button>
          </div>

          <VideoActions video={video} />

          <div className="video-detail__description-box">
            <p className="video-detail__stats">
              <strong>{video.views}</strong> &nbsp;&bull;&nbsp; {video.uploadedAt}
            </p>
            <p className="video-detail__description">
              {video.description || "No description provided for this video. This is a premium YouTube clone demo developed with React."}
            </p>
          </div>

          <Comments />
        </div>

        <aside className="video-detail__sidebar">
          <h3 className="video-detail__sidebar-title">Up Next</h3>
          {suggestedVideos.map((item) => (
            <div 
              key={item.id} 
              className="video-detail__suggested-card"
              onClick={() => onSelectVideo && onSelectVideo(item)}
            >
              <div className="video-detail__suggested-thumb">
                <img src={item.thumbnail} alt={item.title} loading="lazy" />
                <span className="video-detail__suggested-duration">{item.duration}</span>
              </div>
              <div className="video-detail__suggested-info">
                <p className="video-detail__suggested-title">{item.title}</p>
                <p className="video-detail__suggested-channel">{item.channel}</p>
                <p className="video-detail__suggested-meta">{item.views}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default VideoDetail;
