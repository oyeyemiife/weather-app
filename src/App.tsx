import { useEffect, useState } from "react";
import "./App.css";

type TweatherInfo = {
  location: string;
  temperature: string;
  humidity: string;
  timeDate: string;
};

type TlongLat = {
  long: string;
  lat: string;
};

const BASE_URL = "https://api.openweathermap.org";

const API_KEY = "edfcbeb30e618acbfb0ee1d1fc1f65d7";

function App() {
  // On click on submit or on enter key pressed, set the value for weather info
  // But you first need to get the info from the input
  // do an onChange with the input text and save in a state

  //now that we have the city we can get the long and lat, letsmake it a state object
  // {long, lat}
  // so then in our api we can set the long and lat

  // now that we have our long and lat values, we need to set into the weather api but we have to do it in a useEffect which is dependent on longLat changing

  const [weatherInfo, setWeatherInfo] = useState<TweatherInfo>();
  const [inputValue, setInputValue] = useState<string>("");
  const [longLat, setLongLat] = useState<TlongLat>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmitClickedHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fetchLongLat = async () => {
      const res = await fetch(
        `${BASE_URL}/geo/1.0/direct?q=${inputValue}&appid=${API_KEY}`
      );
      const data = await res.json();
      setLongLat({
        long: data[0].lon.toString(),
        lat: data[0].lat.toString(),
      });
    };

    fetchLongLat();
  };

  useEffect(() => {
    if (longLat === undefined) return;
    const fetchWeatherInfo = async () => {
      const weatherRes = await fetch(
        `${BASE_URL}/data/2.5/weather?lat=${longLat?.lat}&lon=${longLat?.long}&appid=${API_KEY}&units=metric`
      );
      const timeDateRes = await fetch(
        `https://timeapi.io/api/time/current/coordinate?latitude=${longLat.lat}&longitude=${longLat.long}`
      );
      const weatherData = await weatherRes.json();
      const timeDateData = await timeDateRes.json();
      setWeatherInfo({
        location: inputValue,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        timeDate: `${timeDateData.time} & ${timeDateData.date}`,
      });
    };

    fetchWeatherInfo();
  }, [longLat, inputValue]);
  return (
    <>
      <div>
        <h1>Weather App</h1>
        <div className="search-bar">
          <div className="display">
            <form onSubmit={onSubmitClickedHandler}>
              <input
                type="search"
                name="search"
                id="search"
                onChange={onChangeHandler}
                placeholder="Search for City..."
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div className="weather-forecast">
            <p>Location: {weatherInfo?.location}</p>
            <p>Temperature: {weatherInfo?.temperature} °C</p>
            <p>Humidity: {weatherInfo?.humidity}</p>
            <p>Time & Date: {weatherInfo?.timeDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
