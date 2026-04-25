import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ onToggleSidebar, onGoHome, theme, onThemeChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  // "closed" | "main" | "appearance"
  const [menuState, setMenuState] = useState("closed");

  function handleSearchChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    alert(`Searching for: "${searchQuery}" (UI demo only)`);
  }

  function handleAvatarClick() {
    setMenuState((prev) => (prev === "closed" ? "main" : "closed"));
  }

  function handleThemeSelect(selected) {
    onThemeChange(selected);
    setMenuState("closed");
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      if (!e.target.closest(".navbar__profile-wrap")) {
        setMenuState("closed");
      }
    }
    if (menuState !== "closed") {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuState]);

  return (
    <nav className="navbar">
      {/* ── Left ── */}
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
            <text x="34" y="15" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="Roboto, sans-serif">
              YouTube
            </text>
          </svg>
        </button>
      </div>

      {/* ── Center: Search ── */}
      <div className="navbar__center">
        <form className="navbar__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Your Endsem Starts 6th of May"
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

      {/* ── Right ── */}
      <div className="navbar__right">
        <button className="navbar__icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </button>

        {/* ── Profile + dropdown wrapper ── */}
        <div className="navbar__profile-wrap">
          <button
            className="navbar__avatar"
            aria-label="User account"
            aria-expanded={menuState !== "closed"}
            onClick={handleAvatarClick}
            id="profile-avatar-btn"
          >
            <span>YT</span>
          </button>

          {/* ── Main dropdown ── */}
          {menuState === "main" && (
            <div className="profile-menu" role="menu" id="profile-menu">
              {/* User info row */}
              <div className="profile-menu__user">
                <div className="profile-menu__avatar-lg">YT</div>
                <div className="profile-menu__user-info">
                  <span className="profile-menu__name">YouTube User</span>
                  <span className="profile-menu__handle">@ytuser</span>
                </div>
              </div>

              <div className="profile-menu__divider" />

              {/* Appearance row — opens submenu */}
              <button
                className="profile-menu__item"
                onClick={() => setMenuState("appearance")}
                id="appearance-menu-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                </svg>
                <span>Appearance: {theme === "dark" ? "Dark" : "Light"}</span>
                <svg className="profile-menu__chevron" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>

              <div className="profile-menu__divider" />

              {/* Other decorative items */}
              <button className="profile-menu__item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span>Google Account</span>
              </button>

              <button className="profile-menu__item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                <span>Help</span>
              </button>

              <button className="profile-menu__item">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                </svg>
                <span>Sign out</span>
              </button>
            </div>
          )}

          {/* ── Appearance submenu ── */}
          {menuState === "appearance" && (
            <div className="profile-menu" role="menu" id="appearance-menu">
              {/* Back button */}
              <button
                className="profile-menu__back"
                onClick={() => setMenuState("main")}
                aria-label="Back to main menu"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <span>Appearance</span>
              </button>

              <div className="profile-menu__divider" />

              <p className="profile-menu__hint">
                Setting applies to this browser only
              </p>

              {/* Dark option */}
              <button
                className={`profile-menu__item profile-menu__item--theme ${theme === "dark" ? "profile-menu__item--selected" : ""}`}
                onClick={() => handleThemeSelect("dark")}
                id="theme-dark-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                </svg>
                <span>Dark theme</span>
                {theme === "dark" && (
                  <svg className="profile-menu__check" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>

              {/* Light option */}
              <button
                className={`profile-menu__item profile-menu__item--theme ${theme === "light" ? "profile-menu__item--selected" : ""}`}
                onClick={() => handleThemeSelect("light")}
                id="theme-light-btn"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 0 0 0-1.41l-1.06-1.06zm1.06-12.37-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0zM7.05 18.36l-1.06 1.06a.996.996 0 0 0 0 1.41c.39.39 1.03.39 1.41 0l1.06-1.06a.996.996 0 0 0 0-1.41.99.99 0 0 0-1.41 0z" />
                </svg>
                <span>Light theme</span>
                {theme === "light" && (
                  <svg className="profile-menu__check" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
