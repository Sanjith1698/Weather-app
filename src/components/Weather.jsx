import React, { useState, useEffect, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();

      const icon = allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon,
      });
    } catch (error) {
      console.error(error);
      alert("City not found");
    }
  };

  useEffect(() => {
    search("");
  }, []);

  return (
    <div className="weather-card">
      <h2>Weather App</h2>

      <div className="search-box">
        <input type="text" ref={inputRef} placeholder="Enter city" />
        <button onClick={() => search(inputRef.current.value)}>
          <img src={search_icon} alt="search" />
        </button>
      </div>

      {weatherData && (
        <div className="weather-info">
          <img src={weatherData.icon} alt="weather" />
          <p>{weatherData.location}</p>
          <p>Temperature: {weatherData.temperature}°C</p>

          <div className="row">
            <div className="col">
              <img src={humidity} alt="" />
              <p>Humidity</p>
              <p>{weatherData.humidity}%</p>
            </div>

            <div className="col">
              <img src={wind} alt="" />
              <p>Wind Speed</p>
              <p>{weatherData.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      )}
      <p class="footer">Designed By Sanjith</p>
    </div>
  );
};

export default Weather;
