import { useState } from "react";
import "./History.css";

const GROUP_ORDER = ["Today", "Yesterday", "This week", "This month"];

/* ── Parse "h:mm:ss" or "mm:ss" to total seconds ── */
function parseDuration(str) {
  const parts = str.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

/* ── Format seconds to "m:ss" or "h:mm:ss" ── */
function formatSeconds(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

/* ── Filter history list by search query ── */
function filterHistory(list, query) {
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q)
  );
}

/* ── Group a list into { Today: [...], Yesterday: [...], ... } ── */
function groupHistory(list) {
  const map = {};
  list.forEach((v) => {
    if (!map[v.watchedAt]) map[v.watchedAt] = [];
    map[v.watchedAt].push(v);
  });
  return map;
}

/* ── Single history row card ── */
function HistoryCard({ item, onRemove }) {
  const totalSec = parseDuration(item.duration);
  const watchedSec = Math.floor((item.progress / 100) * totalSec);
  const remainingSec = totalSec - watchedSec;

  return (
    <div className="history-card" role="button" tabIndex={0}>
      {/* Thumbnail */}
      <div className="history-card__thumb-wrap">
        <img
          className="history-card__thumb"
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
        />
        <span className="history-card__duration">{item.duration}</span>
        <div className="history-card__progress-bar">
          <div
            className="history-card__progress-fill"
            style={{ width: `${item.progress}%` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="history-card__info">
        <h3 className="history-card__title">{item.title}</h3>
        <div className="history-card__channel-row">
          <img
            className="history-card__avatar"
            src={item.channelAvatar}
            alt={item.channel}
          />
          <span className="history-card__channel">{item.channel}</span>
        </div>
        <p className="history-card__meta">
          {item.views}
          {item.progress > 0 && item.progress < 100 && (
            <span className="history-card__remaining">
              &nbsp;·&nbsp;{formatSeconds(remainingSec)} left
            </span>
          )}
        </p>
        <p className="history-card__watched-time">{item.watchedTime}</p>
      </div>

      {/* Remove (×) button */}
      <button
        className="history-card__remove"
        title="Remove from watch history"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item.id);
        }}
        aria-label="Remove from history"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      </button>
    </div>
  );
}

/* ── Main History page — receives state from App.jsx ── */
function History({ history, setHistory }) {
  const [query, setQuery] = useState("");

  function handleRemove(id) {
    setHistory(history.filter((v) => v.id !== id));
  }

  function handleClearAll() {
    setHistory([]);
  }

  // Plain JS: filter then group
  const filtered = filterHistory(history, query);
  const grouped = groupHistory(filtered);

  return (
    <div className="history-page">
      {/* ── Left: main content ── */}
      <div className="history-page__main">
        <h1 className="history-page__heading">Watch history</h1>

        {/* Search bar — only show when there's something to search */}
        {history.length > 0 && (
          <div className="history-page__search-wrap">
            <svg
              className="history-page__search-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M20.87 20.17l-5.59-5.59A7.5 7.5 0 1 0 4.5 18 7.5 7.5 0 0 0 14.58 15.58l5.59 5.59zM6.5 18A5.5 5.5 0 1 1 12 12.5 5.51 5.51 0 0 1 6.5 18z" />
            </svg>
            <input
              className="history-page__search"
              type="text"
              placeholder="Search watch history"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search watch history"
              id="history-search-input"
            />
            {query && (
              <button
                className="history-page__search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Empty history */}
        {history.length === 0 && (
          <div className="history-page__empty">
            <svg
              viewBox="0 0 24 24"
              width="64"
              height="64"
              fill="currentColor"
              className="history-page__empty-icon"
            >
              <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
            </svg>
            <h2>Your watch history is empty</h2>
            <p>Videos you watch will show up here. Go watch something!</p>
          </div>
        )}

        {/* No search results */}
        {history.length > 0 && filtered.length === 0 && (
          <div className="history-page__empty">
            <svg
              viewBox="0 0 24 24"
              width="56"
              height="56"
              fill="currentColor"
              className="history-page__empty-icon"
            >
              <path d="M20.87 20.17l-5.59-5.59A7.5 7.5 0 1 0 4.5 18 7.5 7.5 0 0 0 14.58 15.58l5.59 5.59zM6.5 18A5.5 5.5 0 1 1 12 12.5 5.51 5.51 0 0 1 6.5 18z" />
            </svg>
            <h2>No results found</h2>
            <p>Try a different search term.</p>
          </div>
        )}

        {/* Grouped video cards */}
        {filtered.length > 0 &&
          GROUP_ORDER.filter((g) => grouped[g]).map((group) => (
            <div key={group} className="history-page__group">
              <h2 className="history-page__group-label">{group}</h2>
              <div className="history-page__cards">
                {grouped[group].map((item) => (
                  <HistoryCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* ── Right: manage panel ── */}
      <aside className="history-page__sidebar">
        <h3 className="history-page__sidebar-heading">Manage all history</h3>

        <button
          className="history-page__action-btn"
          onClick={handleClearAll}
          id="clear-history-btn"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
          Clear all watch history
        </button>

        <button className="history-page__action-btn" id="pause-history-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          Pause watch history
        </button>

        <div className="history-page__divider" />

        <p className="history-page__sidebar-info">
          Watch history is only available when history is turned on.
        </p>
        <a href="#" className="history-page__sidebar-link">
          My Activity →
        </a>
      </aside>
    </div>
  );
}

export default History;
