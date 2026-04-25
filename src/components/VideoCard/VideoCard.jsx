import "./VideoCard.css";

function VideoCard({ video, onSelectVideo }) {
  function handleClick() {
  
    onSelectVideo(video);
  }

  return (
    <div className="video-card" onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Watch ${video.title}`}
    >
   
      <div className="video-card__thumbnail-wrapper">
        <img
          className="video-card__thumbnail"
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
        />
        <span className="video-card__duration">{video.duration}</span>
      </div>

 
      <div className="video-card__info">
        
        <div className="video-card__avatar-wrapper">
          <img
            className="video-card__avatar"
            src={video.channelAvatar}
            alt={video.channel}
            loading="lazy"
          />
        </div>

    
        <div className="video-card__meta">
          <h3 className="video-card__title">{video.title}</h3>
          <p className="video-card__channel">{video.channel}</p>
          <p className="video-card__stats">
            {video.views} &bull; {video.uploadedAt}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
