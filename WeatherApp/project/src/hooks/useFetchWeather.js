import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;
const useFetchWeather = (city) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setError(null);
      return;
    }

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        });

        const weatherData = {
          id: response.data.weather[0].id,
          city: response.data.name,
          country: response.data.sys.country,
          temperature: response.data.main.temp,
          condition: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          feelsLike: response.data.main.feels_like,
          timestamp: new Date(response.data.dt * 1000).toLocaleTimeString(),
        };
        setData(weatherData);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? "City not found. Please check the spelling and try again."
            : "Failed to fetch weather data. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, isLoading, error };
};

export default useFetchWeather;
