import React, { useState } from "react";
import "./App.css";
import MoodForm from "./Components/MoodForm/MoodForm";
import Notes from "./Components/NotesComponent/Notes";
import Calendar from "./Components/CalendarComponent/Calendar";

function App() {
  const [entries, setEntries] = useState(
    JSON.parse(localStorage.getItem("entries")) || []
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = (entry) => {
    setEntries([...entries, entry]);
    alert("Note Added");
  };
  return (
    <>
      <h1>WeatherMood</h1>

      <div className="app">
        <div className={darkMode ? "app dark" : "app"}>
          <header className="heading">
            <button className="notes-btn" onClick={() => setModalOpen(true)}>
              View All Notes
            </button>
            <button
              className="dark-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </header>
          <div className="container">
            <MoodForm onSave={handleSave} />
            <Calendar entries={entries} />
          </div>

          <Notes
            show={modalOpen}
            onClose={() => setModalOpen(false)}
            entries={entries}
          />
        </div>
      </div>
    </>
  );
}

export default App;
