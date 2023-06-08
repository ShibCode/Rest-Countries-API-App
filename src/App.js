import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Detail from "./Components/Detail";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setAllCountries(data);
        setLoaded(true);
      });
  }, []);

  const getCountry = (name) => {
    const [country] = allCountries.filter((country) => {
      if (name === country.cca3.toLowerCase()) return true;

      return false;
    });
    return country;
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home allCountries={allCountries} />} />
        <Route
          path="/detail"
          element={<Detail getCountry={getCountry} loaded={loaded} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
