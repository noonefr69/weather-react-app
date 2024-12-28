import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import loading from "../src/assets/Animation - 1735398774975.webm";

export default function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "434f9f845fd586d40d2abe11b49e288a";

  async function fetchWeather(city) {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        alert("City not found or bad request");
        return;
      }

      const data = await response.json();
      setWeather(data); 
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Something went wrong Try again after 5 second!");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather("Tehran");
  }, []);

  async function search() {
    if (!location) {
      alert("Please enter a city name");
      return;
    }

    fetchWeather(location);
  }

  return (
    <div className="bg-slate-700 min-h-[100vh] flex items-center justify-center">
      <div className="bg-slate-600 p-5 rounded-xl">
        <nav className="flex items-center justify-center gap-2">
          <input
            onChange={(e) => setLocation(e.target.value)}
            className="text-[#000000d5] font-semibold px-2 rounded-3xl py-1 border-white outline-none border-2 hover:border-2 hover:border-blue-400 duration-200 focus:border-blue-400"
            placeholder="Enter City Name"
            type="text"
          />
          <button
            onClick={search}
            className="bg-white rounded-full p-2 outline-none transition-all border-white border-2 hover:border-2 duration-200 hover:border-blue-400"
          >
            <IoMdSearch className="" />
          </button>
        </nav>
        <div className="flex flex-col items-center gap-8 py-4">
          {isLoading ? (
            <div className="h-[37.9vh] flex items-center justify-center text-white text-2xl">
              <video muted playsInline autoPlay loop src={loading}></video>
            </div>
          ) : (
            weather && (
              <>
                {weather.weather && (
                  <img
                    className="scale-150"
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather-icon"
                  />
                )}
                <span className="text-white text-5xl relative top-3">
                  {weather.main.temp}°c
                </span>
                <p className="text-white text-2xl">{weather.name}</p>
                <div className="flex justify-center items-center gap-7">
                  <section className="flex">
                    <WiHumidity className="text-4xl text-[#ffffffb7]" />
                    <div>
                      <span className="text-white text-xl font-semibold">
                        {weather.main.humidity}%
                      </span>
                      <h5 className="text-white ">Humidity</h5>
                    </div>
                  </section>
                  <section className="flex gap-2">
                    <FaWind className="text-3xl text-[#ffffffb7]" />
                    <div>
                      <span className="text-white text-xl font-semibold">
                        {weather.wind.speed} km/h
                      </span>
                      <h5 className="text-white ">Wind Speed</h5>
                    </div>
                  </section>
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
