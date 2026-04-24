import { useState } from 'react'
import Navbar from "./components/Navbar/Navbar";
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggleSidebar} onGoHome={handleGoHome} />
    </div>
  );
}

export default App
