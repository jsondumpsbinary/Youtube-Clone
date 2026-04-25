import { useState, useEffect, useRef } from "react";
import "./Shorts.css";

const SHORTS_DATA = [
  {
    id: 101, // Different IDs from main videos to avoid conflict
    title: "5 CSS tricks you didn't know existed 🤯",
    thumbnail: "https://picsum.photos/seed/short1/400/711",
    channel: "PixelPerfect",
    channelAvatar: "https://picsum.photos/seed/coder3/36/36",
    likes: "142K",
    comments: "3.2K",
    shares: "18K",
  },
  {
    id: 102,
    title: "React useState in 60 seconds ⚛️",
    thumbnail: "https://picsum.photos/seed/short2/400/711",
    channel: "CodeWithMe",
    channelAvatar: "https://picsum.photos/seed/coder1/36/36",
    likes: "98K",
    comments: "1.8K",
    shares: "9K",
  },
  {
    id: 103,
    title: "This Python one-liner will blow your mind 🐍",
    thumbnail: "https://picsum.photos/seed/short3/400/711",
    channel: "DataNerd",
    channelAvatar: "https://picsum.photos/seed/coder6/36/36",
    likes: "231K",
    comments: "5.1K",
    shares: "32K",
  },
  {
    id: 104,
    title: "Git stash explained in 30 seconds 💾",
    thumbnail: "https://picsum.photos/seed/short4/400/711",
    channel: "OpenSource HQ",
    channelAvatar: "https://picsum.photos/seed/coder4/36/36",
    likes: "76K",
    comments: "920",
    shares: "6.4K",
  },
  {
    id: 105,
    title: "Stop writing for loops — use this instead 🔥",
    thumbnail: "https://picsum.photos/seed/short5/400/711",
    channel: "DevMastery",
    channelAvatar: "https://picsum.photos/seed/coder2/36/36",
    likes: "189K",
    comments: "4.4K",
    shares: "27K",
  },
  {
    id: 106,
    title: "Docker in 45 seconds 🐳",
    thumbnail: "https://picsum.photos/seed/short6/400/711",
    channel: "DevOps Simplified",
    channelAvatar: "https://picsum.photos/seed/coder8/36/36",
    likes: "310K",
    comments: "7.8K",
    shares: "41K",
  },
  {
    id: 107,
    title: "TypeScript generics made simple 🧩",
    thumbnail: "https://picsum.photos/seed/short7/400/711",
    channel: "StronglyTyped",
    channelAvatar: "https://picsum.photos/seed/coder7/36/36",
    likes: "54K",
    comments: "680",
    shares: "3.9K",
  },
  {
    id: 108,
    title: "Build a button hover effect in pure CSS ✨",
    thumbnail: "https://picsum.photos/seed/short8/400/711",
    channel: "DesignCode",
    channelAvatar: "https://picsum.photos/seed/coder10/36/36",
    likes: "402K",
    comments: "9.3K",
    shares: "58K",
  },
];

function ShortCard({ short, onVisible }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onVisible(short);
        }
      },
      { threshold: 0.7 } // Trigger when 70% of the short is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [short, onVisible]);

  return (
    <div className="short-card" ref={cardRef}>
      <div className="short-card__container">
        <div className="short-card__video-wrap">
          <img
            className="short-card__thumb"
            src={short.thumbnail}
            alt={short.title}
          />
          <div className="short-card__overlay">
            <div className="short-card__channel-row">
              <img
                className="short-card__avatar"
                src={short.channelAvatar}
                alt={short.channel}
              />
              <span className="short-card__channel">{short.channel}</span>
              <button
                className={`short-card__subscribe-btn ${subscribed ? "short-card__subscribe-btn--subscribed" : ""}`}
                onClick={() => setSubscribed(!subscribed)}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
            <p className="short-card__title">{short.title}</p>
          </div>
        </div>

        <div className="short-card__actions">
          <div className="short-card__action">
            <button
              className={`short-card__action-btn ${liked ? "short-card__action-btn--active" : ""}`}
              onClick={() => { setLiked(!liked); setDisliked(false); }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
              </svg>
            </button>
            <span className="short-card__action-label">{short.likes}</span>
          </div>
          <div className="short-card__action">
            <button
              className={`short-card__action-btn ${disliked ? "short-card__action-btn--active" : ""}`}
              onClick={() => { setDisliked(!disliked); setLiked(false); }}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
              </svg>
            </button>
            <span className="short-card__action-label">Dislike</span>
          </div>
          <div className="short-card__action">
            <button className="short-card__action-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
              </svg>
            </button>
            <span className="short-card__action-label">{short.comments}</span>
          </div>
          <div className="short-card__action">
            <button className="short-card__action-btn">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
              </svg>
            </button>
            <span className="short-card__action-label">{short.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Shorts({ onAddToHistory }) {
  const containerRef = useRef(null);

  const handleVisibleShort = (short) => {
    onAddToHistory(short);
  };

  return (
    <div className="shorts-page" ref={containerRef}>
      <div className="shorts-feed">
        {SHORTS_DATA.map((short) => (
          <ShortCard
            key={short.id}
            short={short}
            onVisible={handleVisibleShort}
          />
        ))}
      </div>
    </div>
  );
}

export default Shorts;
