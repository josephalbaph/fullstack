import React, { useState, useEffect } from "react";
import axios from "axios";

const FindCountries = ({ countriesFilter, onChangeCountriesFilter }) => (
  <div>
    find countries:{" "}
    <input value={countriesFilter} onChange={onChangeCountriesFilter} />
  </div>
);

const DisplayCountry = ({ country }) => (
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
  </div>
);

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
