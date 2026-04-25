import "./Sidebar.css";

const NAV_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    label: "Home",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
      </svg>
    ),
    label: "Shorts",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 18v-2.18c-4.74-1.15-8-5.06-8-9.82h2c0 4.07 3.06 7 6 7 .33 0 .68-.03 1-.09V18h-1zm0 0h4v2h-4v-2zM18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 2.97 2.16 5.44 5 5.91V18h2v-4.09c2.84-.47 5-2.94 5-5.91z" />
      </svg>
    ),
    label: "Subscriptions",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
      </svg>
    ),
    label: "Library",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
      </svg>
    ),
    label: "History",
  },
];

const EXPLORE_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    ),
    label: "Music",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5zm4-2c-.83 0-1.5-.67-1.5-1.5S18.67 10 19.5 10s1.5.67 1.5 1.5S20.33 13 19.5 13z" />
      </svg>
    ),
    label: "Gaming",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
      </svg>
    ),
    label: "Live",
  },
];

function Sidebar({ isOpen, onNavigate, activePage }) {
  function handleClick(label) {
    if (label === "Home") onNavigate("home");
    else if (label === "History") onNavigate("history");
    // other items are UI-only for now
  }

  function isActive(label) {
    if (label === "Home" && activePage === "home") return true;
    if (label === "History" && activePage === "history") return true;
    return false;
  }

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--mini"}`}>
      <div className="sidebar__section">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`sidebar__item ${isActive(item.label) ? "sidebar__item--active" : ""}`}
            aria-label={item.label}
            onClick={() => handleClick(item.label)}
          >
            <span className="sidebar__item-icon">{item.icon}</span>
            {isOpen && <span className="sidebar__item-label">{item.label}</span>}
          </button>
        ))}
      </div>

      {isOpen && <div className="sidebar__divider" />}

      {isOpen && (
        <div className="sidebar__section">
          <h3 className="sidebar__section-title">Explore</h3>
          {EXPLORE_ITEMS.map((item) => (
            <button key={item.label} className="sidebar__item" aria-label={item.label}>
              <span className="sidebar__item-icon">{item.icon}</span>
              <span className="sidebar__item-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {!isOpen && (
        <div className="sidebar__section">
          <div className="sidebar__divider sidebar__divider--mini" />
          {EXPLORE_ITEMS.map((item) => (
            <button key={item.label} className="sidebar__item" aria-label={item.label}>
              <span className="sidebar__item-icon">{item.icon}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
