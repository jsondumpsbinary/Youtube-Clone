# 📺 YouTube UI Clone — React Assignment

A frontend-only YouTube UI clone built with React + Vite. This is a first-year college group assignment demonstrating core React fundamentals — components, props, `useState`, `useEffect`, and `fetch` — with no routing libraries, UI frameworks, or backend.

---

## 🛠️ Tech Stack

- **React 18** — functional components only
- **Vite** — dev server and build tool
- **Vanilla CSS** — one `.css` file per component
- **fetch API** with `async/await` — no axios
- **No** `react-router-dom` — navigation simulated with `useState`

---

## 🚀 Getting Started

```bash
# 1. Scaffold a new Vite + React project
npm create vite@latest youtube-clone -- --template react
cd youtube-clone

# 2. Replace the generated src/ with the project files
#    Also copy public/videos.json, index.html, vite.config.js, package.json

# 3. Install and run
npm install
npm run dev
```

App runs at `http://localhost:5173`.

---

## 👥 Team Split — 3 Developers

### Developer 1 — Layout & App State
Owns the app shell, global state, navbar, and sidebar.

- `src/main.jsx` — React DOM entry point
- `src/App.jsx` — manages `selectedVideo` and `sidebarOpen` state; switches between Home and VideoDetail
- `src/index.css` — global reset and CSS variables
- `src/components/Navbar/` — hamburger toggle, search bar, avatar
- `src/components/Sidebar/` — expanded vs. mini icon-only mode via `isOpen` prop

### Developer 2 — Homepage & Data Fetching
Owns the video grid, data fetching, and category pills.

- `public/videos.json` — mock API with 8 video objects
- `src/components/Home/` — `useEffect` + `fetch` with loading skeleton and error state
- `src/components/VideoCard/` — thumbnail card; calls `onSelectVideo` on click
- `src/components/CategoryPills/` — `useState` for active pill (visual only)

### Developer 3 — Detail View & Interactivity
Owns the video detail page and all interactive elements.

- `src/components/VideoDetail/` — large thumbnail placeholder, channel info, suggested sidebar
- `src/components/VideoActions/` — like/dislike toggle with live count; subscribe toggle
- `src/components/Comments/` — pre-loaded dummy comments; add new comment via input + button

---

## 📁 Project Structure

```
youtube-clone/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── videos.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── components/
        ├── Navbar/
        ├── Sidebar/
        ├── CategoryPills/
        ├── VideoCard/
        ├── Home/
        ├── VideoDetail/
        ├── VideoActions/
        └── Comments/
```

---

## 🔀 How Navigation Works (No Router)

A single `selectedVideo` state in `App.jsx` controls which page is shown:

```
selectedVideo === null  →  show <Home />
selectedVideo !== null  →  show <VideoDetail />
```

Clicking a `VideoCard` calls `onSelectVideo(video)` to set the state. The Back button in `VideoDetail` calls `onGoHome()` to reset it to `null`. No `react-router-dom` is used anywhere.

---

## ✅ Features

- Collapsible sidebar (full ↔ mini icon-only)
- Category filter pills with active state
- Video grid fetched from `videos.json` with loading skeleton and error handling
- Click a card to navigate to the detail page
- Like / dislike toggle with live count
- Subscribe / unsubscribe toggle
- Add and display comments (persists during the session)
- Suggested videos sidebar on the detail page
- Fully responsive layout

---

## 📌 Assignment Constraints

| Rule | Status |
|---|---|
| Functional components only | ✅ |
| Only `useState` and `useEffect` | ✅ |
| `fetch` API — no axios | ✅ |
| No `react-router-dom` | ✅ |
| No TypeScript | ✅ |
| No Tailwind / Bootstrap / UI libraries | ✅ |
| Mock data from local `videos.json` | ✅ |
| Navigation via `useState` conditional render | ✅ |
| Three non-overlapping developer sections | ✅ |
