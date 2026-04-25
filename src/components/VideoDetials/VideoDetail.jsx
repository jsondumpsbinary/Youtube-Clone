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
    </div>
  );
}

export default VideoDetail;
