import "./VideoCard.css";

function VideoCard({ video, onSelectVideo }) {
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


      
    </div>
  );
}

export default VideoCard;
