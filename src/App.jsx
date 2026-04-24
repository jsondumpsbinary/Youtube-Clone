import { useState } from 'react'
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleToggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  return (
    <div className="app">
      <Navbar onToggleSidebar={handleToggleSidebar} onGoHome={handleGoHome} />

      <div className="app__body">

        <Sidebar isOpen={sidebarOpen} />
          
      </div>
    </div>
  );
}

export default App
