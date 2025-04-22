import React, { useState } from "react";
import "./Notes.css";

export default function Notes({ show, onClose, entries }) {
  const [selectedMood, setSelectedMood] = useState("");

  if (!show) return null;

  const filteredEntries = selectedMood
    ? entries.filter((entry) => entry.mood.label === selectedMood)
    : entries;

  const handleMoodChange = (event) => {
    setSelectedMood(event.target.value);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>All Notes</h2>

        <select onChange={handleMoodChange} value={selectedMood}>
          <option value="">All Moods</option>
          <option value="Happy">Happy</option>
          <option value="Neutral">Neutral</option>
          <option value="Sad">Sad</option>
          <option value="Angry">Angry</option>
          <option value="Sick">Sick</option>
        </select>

        {filteredEntries.length === 0 ? (
          <p>No entries found for this mood. Try another filter.</p>
        ) : (
          <div className="notes-grid">
            {filteredEntries.map((entry, idx) => (
              <div className="note-card" key={idx}>
                <span className="emoji">{entry.mood.emoji}</span>
                <p>{entry.note}</p>
                <small>{entry.date}</small>
                {entry.weather && (
                  <div className="weather-info">
                    <img
                      src={`https://openweathermap.org/img/wn/${entry.weather.icon}@2x.png`}
                      alt={entry.weather.desc}
                    />
                    <span>{entry.weather.temp}°C</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
