import React, { useState } from "react";
import "./Calendar.css";

export default function Calendar({ entries }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedEntry, setSelectedEntry] = useState(null);

  const moods = {
    Happy: "#FFD93D",
    Neutral: "#FFBD59",
    Sad: "#A0C4FF",
    Angry: "#FF6B6B",
    Sick: "#9ED99E",
  };

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getStartDay = (year, month) => new Date(year, month, 1).getDay();
  const getEntryByDate = (dateString) =>
    entries.find((e) => e.date === dateString);

  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const handlePrevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((y) => y - 1);
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (month === 11) setYear((y) => y + 1);
  };

  const handleDayClick = (day) => {
    const date = new Date(year, month, day).toLocaleDateString();
    const entry = getEntryByDate(date);
    if (entry) setSelectedEntry(entry);
    else setSelectedEntry(null);
  };

  const dayCells = [];

  for (let i = 0; i < startDay; i++) {
    dayCells.push(<div key={`empty-${i}`} className="calendar-day empty" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d).toLocaleDateString();
    const entry = getEntryByDate(date);

    dayCells.push(
      <div
        key={d}
        className="calendar-day filled"
        onClick={() => handleDayClick(d)}
      >
        <span className="day-number">{d}</span>
        {entry && (
          <span
            className="mood-dot"
            style={{ backgroundColor: moods[entry.mood.label] || "#ccc" }}
            title={entry.mood.label}
          />
        )}
      </div>
    );
  }

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>←</button>
        <h3>
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={handleNextMonth}>→</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="calendar-day header">
            {d.charAt(0)}
          </div>
        ))}
        {dayCells}
      </div>

      {selectedEntry && (
        <div className="calendar-entry-popup">
          <h4>{selectedEntry.date}</h4>
          <p>
            {selectedEntry.mood.emoji}{" "}
            <strong>{selectedEntry.mood.label}</strong>
          </p>
          <p>“{selectedEntry.note}”</p>
          {selectedEntry.weather && (
            <div className="weather-info">
              <img
                src={`https://openweathermap.org/img/wn/${selectedEntry.weather.icon}@2x.png`}
                alt={selectedEntry.weather.desc}
              />
              <span>
                {selectedEntry.weather.temp}°C - {selectedEntry.weather.desc}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
