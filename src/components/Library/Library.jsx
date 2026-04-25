import { useState, useEffect } from "react";
import "./Library.css";

const PLAYLISTS = [
  {
    id: "pl1",
    title: "React Mastery (or despair?)",
    thumbnail: "https://picsum.photos/seed/react_pl/300/170",
    videoCount: 42,
    topic: "React",
  },
  {
    id: "pl2",
    title: "HTML/CSS: Pixel Purgatory",
    thumbnail: "https://picsum.photos/seed/html_pl/300/170",
    videoCount: 28,
    topic: "Web Design",
  },
  {
    id: "pl3",
    title: "JS: Callback Hell & Beyond",
    thumbnail: "https://picsum.photos/seed/js_pl/300/170",
    videoCount: 56,
    topic: "JavaScript",
  },
  {
    id: "pl4",
    title: "Node.js: Backend Nightmares",
    thumbnail: "https://picsum.photos/seed/node_pl/300/170",
    videoCount: 31,
    topic: "Backend",
  },
  {
    id: "pl5",
    title: "Git: Merge Conflict Simulator",
    thumbnail: "https://picsum.photos/seed/git_pl/300/170",
    videoCount: 15,
    topic: "DevOps",
  },
  {
    id: "pl6",
    title: "Python: Indentation Errors 101",
    thumbnail: "https://picsum.photos/seed/python_pl/300/170",
    videoCount: 39,
    topic: "Python",
  },
];

const SARCASTIC_MESSAGES = [
  "Oh, finally gonna study? The exam was supposed to be yesterday in a parallel universe.",
  "Your exam starts soon... and by 'soon', I mean you're already late.",
  "When will you start? When the keyboard learns to code itself?",
  "Ah, the annual visit to the Library. Decided to learn 'Hello World' today?",
  "Don't worry, the 10-hour tutorial will definitely save your grade. Definitely.",
  "Looking for the 'How to pass without studying' playlist? It's right next to the 'Unicorn sightings' folder.",
  "Welcome back! Your chair missed you. Your brain... well, let's not go there.",
  "Clicking a playlist is the first step. The second step is actually watching it. Good luck.",
];

function Library() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Pick a random sarcastic message on load
    const randomIdx = Math.floor(Math.random() * SARCASTIC_MESSAGES.length);
    setMessage(SARCASTIC_MESSAGES[randomIdx]);
  }, []);

  return (
    <div className="library">
      <header className="library__header">
        <div className="library__message-box">
          <span className="library__emoji">🙄</span>
          <p className="library__sarcastic-msg">{message}</p>
        </div>
      </header>

      <section className="library__section">
        <div className="library__section-title-wrap">
          <h2 className="library__section-title">Study Playlists (If you actually care)</h2>
          <span className="library__section-subtitle">Updated 2 minutes ago... like you'd notice.</span>
        </div>

        <div className="library__grid">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="library__card">
              <div className="library__thumb-wrap">
                <img className="library__thumb" src={playlist.thumbnail} alt={playlist.title} />
                <div className="library__playlist-overlay">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                    <path d="M22 7H2v2h20V7zm-8 4H2v2h12v-2zm0 4H2v2h12v-2zm8-11H2v2h20V4zM2 19h20v-2H2v2z" />
                  </svg>
                  <span>{playlist.videoCount} videos</span>
                </div>
              </div>
              <div className="library__info">
                <h3 className="library__title">{playlist.title}</h3>
                <p className="library__topic">Topic: {playlist.topic}</p>
                <button className="library__view-btn">View full playlist</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="library__footer">
        <p>Pro tip: Staring at the screen doesn't count as studying. Go code something.</p>
      </footer>
    </div>
  );
}

export default Library;
