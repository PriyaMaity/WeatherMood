import React from "react";
import "./Notes.css";

export default function Notes({ show, onClose, entries }) {
  if (!show) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>All Notes</h2>
        <div className="notes-grid">
          {entries.map((entry, idx) => (
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
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
