import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
    const [weather, setWeather] = useState();
    const [city, setCity] = useState("Toronto"); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!city.trim()) return; 
            setLoading(true);
            try {
                const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
                const response = await axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
                );
                setWeather(response.data);
                setError("");
            } catch (err) {
                setWeather(null);
                setError(err.response?.data?.message || "Failed to fetch weather.");
            } finally {
                setLoading(false);
            }
        };
        fetchWeather();
    }, [city]); 

    return (
        <div className="container mt-5">

            <div className="mb-4 text-center">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="form-control w-50 mx-auto"
                />
            </div>

            {loading && <div className="text-center mt-3">Loading...</div>}
            {error && <div className="alert alert-warning text-center mt-3">{error}</div>}

            {weather && (
                <div className="card mx-auto" style={{ maxWidth: "400px"}}>
                    <div className="card-body text-center">
                        <h5 className="card-title">{weather.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{weather.weather[0].main}</h6>
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            className="mb-2"
                        />
                        <p className="card-text">{weather.weather[0].description.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</p>
                        <p className="card-text">
                            <strong>Temperature:</strong> {(weather.main.temp - 273.15).toFixed(0)}°C
                        </p>
                        <p className="card-text">
                            <strong>High:</strong> {(weather.main.temp_max - 273.15).toFixed(0)}°C
                        </p>
                        <p className="card-text">
                            <strong>Low:</strong> {(weather.main.temp_min - 273.15).toFixed(0)}°C
                        </p>
                        <p className="card-text">
                            <strong>Wind:</strong> {weather.wind.speed.toFixed(0)} km/h
                        </p>
                        <p className="card-text">
                            <strong>Humidity:</strong> {weather.main.humidity}%
                        </p>
                        <p className="card-text">
                            <strong>Pressure</strong> {weather.main.pressure} hPa
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Weather;
