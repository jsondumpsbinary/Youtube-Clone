import { useState } from "react";
import "./Navbar.css";

function Navbar({ onToggleSidebar, onGoHome }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    alert(`Searching for: "${searchQuery}" (UI demo only)`);
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button
          className="navbar__icon-btn navbar__hamburger"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <button className="navbar__logo" onClick={onGoHome} aria-label="Go home">
          <svg className="navbar__logo-icon" viewBox="0 0 90 20" fill="none">
            <rect width="30" height="20" rx="4" fill="#FF0000" />
            <polygon points="12,6 12,14 20,10" fill="white" />
            <text x="34" y="15" fill="#f1f1f1" fontSize="16" fontWeight="700" fontFamily="Roboto, sans-serif">
              YouTube
            </text>
          </svg>
        </button>
      </div>

      <div className="navbar__center">
        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search videos"
          />
          <button type="submit" className="navbar__search-btn" aria-label="Submit search">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20.87 20.17l-5.59-5.59A7.492 7.492 0 0015 10.5C15 6.36 11.64 3 7.5 3S0 6.36 0 10.5 3.36 18 7.5 18c1.83 0 3.5-.66 4.79-1.75l5.59 5.59.99-.99zM7.5 16C4.47 16 2 13.53 2 10.5S4.47 5 7.5 5 13 7.47 13 10.5 10.53 16 7.5 16z" />
            </svg>
          </button>
        </form>

        <button className="navbar__icon-btn navbar__mic-btn" aria-label="Search with voice">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
          </svg>
        </button>
      </div>

      <div className="navbar__right">
        <button className="navbar__icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>

        <button className="navbar__avatar" aria-label="User account">
          <span>YT</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;