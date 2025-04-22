export async function getWeather(lat, lon) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Weather API response:", data);
    return {
      temp: Math.round(data.main.temp),
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}
