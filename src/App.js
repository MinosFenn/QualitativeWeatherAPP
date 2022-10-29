import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';
import technicJacket from './images/clothes/doudoune.png';
import softPant from './images/clothes/pantalon-leger.png';
import technicPant from './images/clothes/pantalong-technique.png';
import polo from './images/clothes/polo.png';
import pull from './images/clothes/pullover.png';
import short from './images/clothes/short.png';
import sweat from './images/clothes/sweat.png';
import tshirt from './images/clothes/Tshirt.png';
import softJacket from './images/clothes/veste-legere.png';
import longJacket from './images/clothes/veste-longue.png';
import middleJacket from './images/clothes/veste-moyenne.png';
import jeans from './images/clothes/jean.png';
import sleevelessJacket from './images/clothes/doudoune-sans-manche.png';
import shirt from './images/clothes/doudoune-sans-manche.png';
import sunrise from './images/sunrise-weather-symbol_icon-icons.com_64261.png';
import sunset from './images/sunset-fill-interface-symbol_icon-icons.com_64262.png';
import Model from './Model.js';

const api = {
  base: 'https://api.openweathermap.org/data/2.5/',
  // translate city into lat long with google maps api
  // new url: https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');
  const [indicator, setMainIndic] = useState('');

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          setMainIndic(result.main);
          console.log(result);
        })
        .catch((err) => console.log(err.type));
    }
  };
  // console.log(indicator.temp);

  // console.log(weather.weather[0].main);
  // console.log(Object.values(weather.weather[0]));

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  const SecondsToHms = (props) => {
    let date = Date(`${props.value}`);
    const moment = props.value * 1000;
    const dateObject = new Date(moment);
    const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
    const hour = dateObject.toLocaleString('fr-FR', { hour: 'numeric' }); // 10 AM
    const minute = dateObject.toLocaleString('fr-FR', { minute: 'numeric' }); // 30
    return `${hour} ${minute}`;
  };
  // create feature holiday: choose a destination, bag capacity, time period > recommendation system
  // switch replace by object map at some point
  function SwitchCaseTempTop(props) {
    console.log(props.value);
    switch (true) {
      //Snow cases
      case props.value <= 0:
        return (
          <>
            <img src={technicJacket} />
            <img src={technicPant} />
            <img src={tshirt} />
          </>
        );
      case weather.weather[0].main && props.value <= 10:
        return (
          <>
            <img src={softJacket} />
            <img src={jeans} />
            <img src={tshirt} />
          </>
        );
      case weather.weather[0].main && props.value <= -20:
        return (
          <>
            <img src={technicJacket} />
            <img src={pull} />
            <img src={tshirt} />
            <img src={technicPant} />
          </>
        );
      //Rain cases

      // Warm cases
      case props.value <= 20:
        return (
          <>
            <img src={middleJacket} />
            <img src={tshirt} />
            <img src={jeans} />
          </>
        );
      case props.value <= 30 && props.value >= 20:
        return (
          <>
            <img src={tshirt} />
            <img src={jeans} />
          </>
        );
      case props.value >= 30:
        return (
          <>
            <img src={tshirt} />
            <img src={short} />
          </>
        );
      default:
        return '404';
    }
  }

  return (
    <div
      className={
        typeof weather.main != 'undefined' ? weather.weather[0].main : 'app'
      }
    >
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
        {typeof weather.main !== 'undefined' ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>

              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="top">
                <Canvas
                  style={{ height: `calc(150% - 100px)` }}
                  camera={{ fov: 1.5,near: 0.3, position: [0, 40, 90] }}
                >
                  <Suspense fallback={null}>
                    <Model />
                    <OrbitControls />
                    <Environment preset="sunset" />
                  </Suspense>
                </Canvas>
                <SwitchCaseTempTop value={indicator.temp} />
                {/* fix value to test switch case  */}
                {/* <SwitchCaseTempTop value="0" /> */}
              </div>
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="location">
                {' '}
                <img src={sunrise} />
                <SecondsToHms value={weather.sys.sunrise} />
                {/* {SecondsToHms( Date(`${weather.sys.sunrise}`))} */}
                <img src={sunset} />
                <SecondsToHms value={weather.sys.sunset} />
              </div>
              <div className="weather">{weather.weather[0].main}</div>
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
