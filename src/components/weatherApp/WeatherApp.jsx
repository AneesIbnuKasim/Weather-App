import React, { useState } from 'react';
import './WeaterApp.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/clound.png';
import drizzle_icon from '../assets/drizzle.avif';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.jpg';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const API_KEY = 'c3eff91f5ec115b2c5761c29a8dc5a6d';

const ICON_MAP = {
  '01d': clear_icon, '01n': clear_icon,
  '02d': cloud_icon, '02n': cloud_icon,
  '03d': drizzle_icon, '03n': drizzle_icon,
  '04d': cloud_icon, '04n': cloud_icon,
  '09d': rain_icon, '09n': rain_icon,
  '10d': rain_icon, '10n': rain_icon,
  '13d': snow_icon, '13n': snow_icon,
};

function WeatherApp() {
  const [city, setCity] = useState('kannur');
  const [weather, setWeather] = useState(null);
  const [wIcon, setWIcon] = useState(clear_icon);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async () => {
    const q = city.trim();
    if (!q) return;

    setLoading(true);
    setError('');

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) {
        setError('City not found. Please try again..');
        setLoading(false);
        return;
      }

      setWeather({
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        location: data.name + (data.sys?.country ? `, ${data.sys.country}` : ''),
        description: data.weather[0]?.description ?? '',
      });

      const iconCode = data.weather[0]?.icon ?? '01d';
      setWIcon(ICON_MAP[iconCode] ?? clear_icon);
    } catch {
      setError('Network error. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') search();
  };

  return (
    <div className="container">

      {/* ── Search ───────────────────────── */}
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search city…"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKey}
        />
        <div className="search-icon" onClick={search} role="button" aria-label="Search">
          <img src={search_icon} alt="search" />
        </div>
      </div>

      {/* ── Status messages ─────────────── */}
      {loading && <p className="loading-msg">Fetching weather…</p>}
      {error && <p className="status-msg">{error}</p>}

      {/* ── Weather Display ──────────────── */}
      <div className="weather-image">
        <img src={wIcon} alt="weather condition" />
      </div>

      <div className="weather-temp">
        {weather ? `${weather.temp}°C` : '—°C'}
      </div>

      {weather?.description ? (
        <div className="weather-description">{weather.description}</div>
      ) : null}

      <div className="weather-location">
        {weather ? weather.location : 'Your City'}
      </div>

      {/* ── Divider ─────────────────────── */}
      <div className="divider" />

      {/* ── Stats Grid ──────────────────── */}
      <div className="data-container">

        <div className="element">
          <div className="element-icon-wrap">
            <img src={humidity_icon} alt="humidity" className="icon" />
          </div>
          <div className="data">
            <span className="value">
              {weather ? `${weather.humidity}%` : '—'}
            </span>
            <span className="label">Humidity</span>
          </div>
        </div>

        <div className="element">
          <div className="element-icon-wrap">
            <img src={wind_icon} alt="wind" className="icon" />
          </div>
          <div className="data">
            <span className="value">
              {weather ? `${weather.windSpeed} km/h` : '—'}
            </span>
            <span className="label">Wind Speed</span>
          </div>
        </div>

        <div className="element">
          <div className="element-icon-wrap">
            <span style={{ fontSize: '22px' }}>🌡️</span>
          </div>
          <div className="data">
            <span className="value">
              {weather ? `${weather.feelsLike}°C` : '—'}
            </span>
            <span className="label">Feels Like</span>
          </div>
        </div>

        <div className="element">
          <div className="element-icon-wrap">
            <span style={{ fontSize: '22px' }}>🌍</span>
          </div>
          <div className="data">
            <span className="value" style={{ fontSize: '1rem' }}>
              {weather ? weather.location.split(',')[0] : '—'}
            </span>
            <span className="label">Location</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default WeatherApp;
