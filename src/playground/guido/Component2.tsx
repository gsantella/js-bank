import { useEffect, useState } from "react";

export default function GuidoComponent2() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=40.5187&longitude=-78.3947&current_weather=true"
      );
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      console.error(err);
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <p>Loading weather…</p>;
  if (!weather) return <p>Unable to load weather.</p>;

  return (
    <div>
      <h2>Altoona, PA Weather</h2>
      <p><strong>Temperature:</strong> {weather.temperature}°C</p>
      <p><strong>Wind Speed:</strong> {weather.windspeed} mph</p>
      <p><strong>Wind Direction:</strong> {weather.winddirection}°</p>
      <p><strong>Conditions Code:</strong> {weather.weathercode}</p>
      <button onClick={fetchWeather}>Refresh</button>
    </div>
  );
}