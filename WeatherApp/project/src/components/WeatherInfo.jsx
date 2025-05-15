import { useMemo } from "react";
import "../styles/WeatherInfo.css";

const WeatherInfo = ({ data }) => {
  if (!data) return null;

  const {
    city = "Unknown",
    country = "",
    temperature = "--",
    condition = "",
    description = "",
    icon = "01d",
    humidity = "--",
    windSpeed = "--",
    feelsLike = "--",
    timestamp = "",
  } = data;

  const backgroundClass = useMemo(() => {
    const cond = condition.toLowerCase();
    if (cond.includes("clear")) return "bg-clear";
    if (cond.includes("cloud")) return "bg-cloudy";
    if (cond.includes("rain") || cond.includes("drizzle")) return "bg-rainy";
    if (cond.includes("snow")) return "bg-snowy";
    if (cond.includes("storm") || cond.includes("thunder")) return "bg-stormy";
    return "bg-default";
  }, [condition]);

  return (
    <div className={`weather-info ${backgroundClass}`}>
      <div className="weather-header">
        <h2 className="city-name">
          {city}, {country}
        </h2>
        <p className="timestamp">Last updated: {timestamp}</p>
      </div>
      <div className="weather-body">
        <div className="weather-main">
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description || "Weather icon"}
            className="weather-icon"
            aria-label={description || "Weather icon"}
          />
          <div className="temperature-container">
            <h1 className="temperature">
              {temperature !== "--" ? Math.round(temperature) : "--"}°C
            </h1>
            <p className="feels-like">
              Feels like: {feelsLike !== "--" ? Math.round(feelsLike) : "--"}°C
            </p>
          </div>
        </div>
        <p className="condition">{condition}</p>
        <p className="description">{description}</p>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
