// Weather.js (Component)
import React, { useState } from 'react';
import styles from './Weather.module.css'; // Import CSS module for scoped styling

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  
  // OpenWeather API key
  const API_KEY = 'eff684b92a05891673901c34dc44d75f';
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData({
        temp: data.main.temp,
        city: data.name,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className={styles.weatherContainer}>
        <h1 className={styles.weatherTitle}>🌤Weather web app🌦</h1>
      <form onSubmit={fetchWeather} className={styles.weatherForm}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className={styles.cityInput}
        />
        <button type="submit" className={styles.submitButton}>
          Get Weather
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2>{weatherData.city}</h2>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`}
            alt={weatherData.description}
            className={styles.weatherIcon}
          />
          <p className={styles.temp}>{weatherData.temp}°C</p>
          <p className={styles.description}>
            {weatherData.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;