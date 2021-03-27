import React, { useState, useEffect } from "react";
import axios from "axios";

const FindCountries = ({ countriesFilter, onChangeCountriesFilter }) => (
  <div>
    find countries:{" "}
    <input value={countriesFilter} onChange={onChangeCountriesFilter} />
  </div>
);

const DisplayWeather = ({ apiWeather }) => {
  if (apiWeather) {
    if (apiWeather.error !== undefined) {
      return (
        <div>
          <div>{apiWeather.error.info}</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>Temperature {apiWeather.current.temperature} Celcius</div>
          <div>
            {apiWeather.current.weather_icons.map((url) => (
              <img src={url} alt="weather icons" />
            ))}
          </div>
          <div>
            wind: {apiWeather.current.wind_speed} mph direction:{" "}
            {apiWeather.current.wind_dir}{" "}
          </div>
        </div>
      );
    }
  }
  return <div>Finding Weather</div>;
};

const DisplayCountry = ({ country }) => {
  const [apiWeather, setApiWeather] = useState();

  const hookApiWeather = () => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
    };

    axios
      .get("https://api.weatherstack.com/current", { params })
      .then((response) => {
        setApiWeather(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(hookApiWeather, [country.capital]);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Flag" width="100" height="100" />
      <h2>Weather in {country.capital}</h2>
      <DisplayWeather apiWeather={apiWeather} />
    </div>
  );
};

const DisplayCountries = ({ countriesToShow, setCountriesFilter }) => {
  if (countriesToShow.length === 1) {
    return <DisplayCountry country={countriesToShow[0]} />;
  } else if (countriesToShow.length >= 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    return (
      <div>
        {countriesToShow.map((country) => (
          <div key={country.alpha2Code}>
            {country.name}
            <button onClick={() => setCountriesFilter(country.name)}>
              Show
            </button>
          </div>
        ))}
      </div>
    );
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState("");

  const handleCountriesFilterChange = (event) => {
    setCountriesFilter(event.target.value);
  };

  const countriesToShow = countriesFilter
    ? countries.filter((country) =>
        country.name.toLowerCase().includes(countriesFilter.toLowerCase())
      )
    : countries;

  const hookCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hookCountries, []);

  return (
    <div>
      <FindCountries
        countriesFilter={countriesFilter}
        onChangeCountriesFilter={handleCountriesFilterChange}
      />
      <DisplayCountries
        countriesToShow={countriesToShow}
        setCountriesFilter={setCountriesFilter}
      />
    </div>
  );
}

export default App;
