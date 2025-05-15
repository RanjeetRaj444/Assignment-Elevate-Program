import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import WeatherInfo from "./WeatherInfo";
import Loading from "./Loading";
import Error from "./Error";
import useFetchWeather from "../hooks/useFetchWeather";
import "../styles/WeatherApp.css";

const WeatherApp = () => {
  const [searchCity, setSearchCity] = useState(
    () => localStorage.getItem("lastCity") || ""
  );
  const { data, isLoading, error } = useFetchWeather(searchCity);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (searchCity) {
      localStorage.setItem("lastCity", searchCity);
    }
  }, [searchCity]);

  useEffect(() => {
    if (searchBarRef.current && searchBarRef.current.focus) {
      searchBarRef.current.focus();
    }
  }, []);

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  return (
    <div className="weather-app">
      <div className="weather-container">
        <h1 className="app-title">Weather App</h1>
        <SearchBar onSearch={handleSearch} ref={searchBarRef} />

        <div className="content-area">
          {isLoading && <Loading />}
          {error && <Error message={error} />}
          {!isLoading && !error && data && <WeatherInfo data={data} />}
          {!isLoading && !error && !data && !searchCity && (
            <div
              className="welcome-message"
              style={{ textAlign: "center", marginTop: "2rem", color: "#555" }}
            >
              <p>
                <span role="img" aria-label="sun">
                  🌤️
                </span>
                <br />
                <strong>Welcome!</strong>
                <br />
                Enter a city name above to get the latest weather updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
