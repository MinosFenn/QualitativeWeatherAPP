import React, { useState } from "react";

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  // translate city into lat long with google maps api
  // new url: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [indicator, setMainIndic] = useState("");
  const [rain, setRain] = useState("");
  const [snow, setSnow] = useState("");
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          setMainIndic(result.main);
          setRain(result.rain);
          setSnow(result.snow);
          console.log(result);
        });
    }
  };

  console.log(weather.main);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  function SwitchCaseTempTop(props) {
    console.log(props.value);
    switch (true) {
      case props.value <= 20:
        return "T-shirt plus hoodie";
      case props.value <= 30 && props.value >= 20:
        return `a t-shirt is enough`;
      case props.value >= 30:
        return `you can go naked it's warm enough`;
      default:
        return "";
    }
  }
  function SwitchCaseTopJacket(props) {
    console.log(props.value);
    switch (true) {
      case props.value <= 20:
        return "T-shirt plus hoodie";
      case props.value <= 30 && props.value >= 20:
        return `a t-shirt is enough`;
      case props.value >= 30:
        return `you can go naked it's warm enough`;
      default:
        return "";
    }
  }
  function SwitchCaseElseRain(props) {
    console.log(props.value);
    switch (true) {
      case props.value <= 20:
        return "T-shirt plus hoodie";
      case props.value <= 30 && props.value >= 20:
        return `a t-shirt is enough`;
      case props.value >= 30:
        return `you can go naked it's warm enough`;
      default:
        return "";
    }
  }

  function SwitchCaseElseSnow(props) {
    console.log(props.value);
    switch (true) {
      case props.value <= 20:
        return "T-shirt plus hoodie";
      case props.value >= 20:
        return `a t-shirt is enough`;
      case props.value >= 30:
        return `you can go naked it's warm enough`;
      default:
        return "";
    }
  }
  return (
    <div className={(typeof weather.main != "undefined") ? (weather.weather[0].main) : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="test"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="top">
                <SwitchCaseTempTop value={indicator.temp} />
              </div>
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>

              <SwitchCaseElseRain value={rain} />
              <SwitchCaseElseSnow value={snow} />
            </div>
          </div>
        ) : (
          <div>nothing found</div>
        )}
      </main>
    </div>
  );
}

export default App;
