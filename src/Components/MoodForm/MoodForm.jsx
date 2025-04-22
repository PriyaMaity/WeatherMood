import React, { useState, useEffect } from "react";
import "./MoodForm.css";
import { getWeather } from "../WeatherComponent/Weather";

const moods = [
  { emoji: "😊", label: "Happy", color: "#FFD93D" },
  { emoji: "😐", label: "Neutral", color: "#FFBD59" },
  { emoji: "😔", label: "Sad", color: "#A0C4FF" },
  { emoji: "😠", label: "Angry", color: "#FF6B6B" },
  { emoji: "🤢", label: "Sick", color: "#9ED99E" },
];

export default function MoodForm({ onSave }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const weatherData = await getWeather(latitude, longitude);
        console.log("Weather Data:", weatherData);
        setWeather(weatherData);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  const handleSave = () => {
    console.log("Selected Mood:", selectedMood);
    console.log("Note:", note);
    console.log("Weather:", weather);
    if (!selectedMood || note.trim() === "") {
      alert("Please select a mood and write a note.");
      return;
    }

    const entry = {
      date: new Date().toLocaleDateString(),
      mood: selectedMood,
      note,
      weather,
    };

    const entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    console.log("Entries in Local Storage:", entries);

    onSave(entry);
    setSelectedMood(null);
    setNote("");
  };

  return (
    <div className="mood-entry">
      <h2>{new Date().toDateString()}</h2>

      {weather && (
        <div className="weather-display">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.desc}
            className="weather-icon"
          />
          <span>
            {weather.temp}°C - {weather.desc}
          </span>
        </div>
      )}

      <p>How are you feeling today?</p>
      <div className="mood-options">
        {moods.map((mood) => (
          <span
            key={mood.label}
            className={`mood-icon ${
              selectedMood?.label === mood.label ? "selected" : ""
            }`}
            style={{
              backgroundColor:
                selectedMood?.label === mood.label ? mood.color : "#eee",
            }}
            onClick={() => setSelectedMood(mood)}
          >
            {mood.emoji}
          </span>
        ))}
      </div>
      <textarea
        placeholder="Add a note..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
