import { useState } from "react";
import "./VideoActions.css";

function VideoActions({ video }) {
    const [likeCount, setLikeCount] = useState(
    parseInt((video.likes || "0").replace("K", "")) * 1000
  );
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
      if (disliked) setDisliked(false);
    }
  }

  function handleDislike() {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    }
  }

  function handleSubscribe() {
    setSubscribed((prev) => !prev);
  }

  function formatCount(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return String(n);
  }
return (
    <div className="video-actions">
      {/* ── Left group: Like / Dislike ── */}
      <div className="video-actions__group">
        {/* Like Button */}
        <button
          className={`video-actions__btn video-actions__btn--like ${liked ? "video-actions__btn--active" : ""}`}
          onClick={handleLike}
          aria-label={liked ? "Unlike" : "Like"}
          aria-pressed={liked}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
          </svg>
          <span>{formatCount(likeCount)}</span>
        </button>

        {/* Divider */}
        <div className="video-actions__divider" />

        {/* Dislike Button */}
        <button
          className={`video-actions__btn video-actions__btn--dislike ${disliked ? "video-actions__btn--active" : ""}`}
          onClick={handleDislike}
          aria-label={disliked ? "Remove dislike" : "Dislike"}
          aria-pressed={disliked}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
          </svg>
        </button>
      </div>

      {/* ── Share Button ── */}
      <button className="video-actions__btn video-actions__btn--share">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
        </svg>
        <span>Share</span>
      </button>

      {/* ── Save Button ── */}
      <button className="video-actions__btn video-actions__btn--save">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M22 13h-4v4h-2v-4h-4v-2h4V7h2v4h4v2zm-8-6H2v1h12V7zM2 12h8v-1H2v1zm0 4h8v-1H2v1z" />
        </svg>
        <span>Save</span>
      </button>

      {/* ── Subscribe Button (right-aligned) ── */}
      <button
        className={`video-actions__subscribe ${subscribed ? "video-actions__subscribe--subscribed" : ""}`}
        onClick={handleSubscribe}
        aria-label={subscribed ? "Unsubscribe" : "Subscribe"}
      >
        {subscribed ? (
          <>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Subscribed
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </div>
  );
}

export default VideoActions;
