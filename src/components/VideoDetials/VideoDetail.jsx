import VideoActions from "../VideoActions/VideoActions";
import Comments from "../Comments/Comments";
import "./VideoDetail.css";

function VideoDetail({ video, onGoHome }) {
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
          <div className="video-detail__player">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="video-detail__thumbnail"
            />
            <div className="video-detail__play-overlay">
              <div className="video-detail__play-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="video-detail__play-note">UI Demo — No Playback</p>
            </div>
            <span className="video-detail__duration-badge">{video.duration}</span>
          </div>
          <h1 className="video-detail__title">{video.title}</h1>
          <div className="video-detail__meta-row">
            <div className="video-detail__channel-info">
              <img
                className="video-detail__channel-avatar"
                src={video.channelAvatar}
                alt={video.channel}
              />
              <div>
                <p className="video-detail__channel-name">{video.channel}</p>
                <p className="video-detail__subscribers">{video.subscribers} subscribers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
