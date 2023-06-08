import React, { useEffect, useState } from "react";
import Flag from "./Flag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useDarkTheme } from "../Context/DarkTheme";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Home = ({ allCountries }) => {
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const [dropDownActive, setDropDownActive] = useState(false);
  const [dropDownFilter, setDropDownFilter] = useState("Filter by Region");

  const [tab, setTab] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const [darkTheme] = useDarkTheme();

  useEffect(() => {
    const tabSearch = location.search;
    const tab = new URLSearchParams(tabSearch).get("tab");
    setTab(+tab !== 0 ? +tab : 1);
  }, [location]);

  useEffect(() => setFilteredCountries(allCountries), [allCountries]);

  useEffect(() => {
    if (dropDownFilter !== "Filter by Region") filterCountries();
  }, [dropDownFilter]);

  const search = (e) => {
    e.preventDefault();
    filterCountries();
  };

  const filterCountries = () => {
    const filtered = allCountries.filter((country) => {
      if (dropDownFilter !== "Filter by Region" && dropDownFilter !== "All") {
        return (
          country.name.common
            .toLowerCase()
            .includes(searchInput.toLowerCase()) &&
          country.region === dropDownFilter
        );
      }

      return country.name.common
        .toLowerCase()
        .includes(searchInput.toLowerCase());
    });

    setTab(1);
    navigate("/");
    setFilteredCountries(filtered);
  };

  return (
    <div
      className={`${
        darkTheme ? "bg-veryDarkBlue" : "bg-lightWhite"
      } wrapper min-h-[calc(100vh-60px)]`}
    >
      <div className="contain flex-col gap-8 md:gap-12 py-12">
        <div className="flex items-center gap-6 md:gap-0 justify-between flex-col md:flex-row">
          <form
            className={`${
              darkTheme ? "bg-darkBlue" : "bg-white shadow-md"
            } flex rounded-sm w-96 max-w-[300px] sm:max-w-none`}
            onSubmit={search}
          >
            <button className="h-12 grid place-items-center px-5">
              <FontAwesomeIcon
                icon={faSearch}
                className={darkTheme ? "text-white" : "text-veryDarkBlue"}
              />
            </button>
            <input
              type="text"
              placeholder="Search for a country..."
              className={`${
                darkTheme ? "text-white" : "text-darkGray"
              } px-2 h-12 bg-transparent outline-none flex-1`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>

          <button
            className={`flex items-center justify-between rounded-sm relative h-12 px-5 w-full max-w-[300px] sm:max-w-none sm:w-[225px] cursor-pointer shadow-md ${
              darkTheme ? "bg-darkBlue" : "bg-white"
            }`}
            onClick={() => setDropDownActive((prev) => !prev)}
          >
            <div
              className={`${
                darkTheme ? "text-white" : "text-veryDarkBlue"
              } opacity-80`}
            >
              {dropDownFilter}
            </div>

            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${darkTheme ? "text-white" : "text-veryDarkBlue"}`}
            />

            <div
              className={`${
                darkTheme
                  ? "text-white bg-darkBlue"
                  : "text-veryDarkBlue bg-white"
              } ${
                dropDownActive ? "flex" : "hidden"
              } flex-col absolute top-[54px] shadow-md rounded-sm w-full left-0 py-2 z-10`}
            >
              <button
                className="text-start px-6 py-2"
                onClick={() => {
                  setDropDownFilter("All");
                }}
              >
                All
              </button>
              <button
                className="text-start px-6 py-2"
                onClick={() => {
                  setDropDownFilter("Africa");
                }}
              >
                Africa
              </button>
              <button
                className="text-start px-6 py-2"
                onClick={() => {
                  setDropDownFilter("Americas");
                }}
              >
                Americas
              </button>
              <button
                className="text-start px-6 py-2"
                onClick={() => {
                  setDropDownFilter("Asia");
                }}
              >
                Asia
              </button>
              <button
                className="text-start px-6 py-2"
                onClick={() => {
                  setDropDownFilter("Europe");
                }}
              >
                Europe
              </button>
              <button
                className="text-start px-6 py-2"
                onClick={() => {
                  setDropDownFilter("Oceania");
                }}
              >
                Oceania
              </button>
            </div>
          </button>
        </div>
        {allCountries.length > 0 ? (
          <div className="flex flex-col items-center sm:items-stretch sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCountries
              .slice((tab - 1) * ITEMS_PER_PAGE, tab * ITEMS_PER_PAGE)
              .map((country, index) => {
                return <Flag key={index} country={country} />;
              })}
          </div>
        ) : (
          <div
            className={`${
              darkTheme ? "text-white" : "text-veryDarkBlue"
            } text-3xl text-center w-full`}
          >
            Loading
          </div>
        )}

        {allCountries.length > 0 && (
          <div className="flex gap-2 mx-auto">
            <Link
              to={`?tab=${tab > 1 ? tab - 1 : tab}`}
              className={`${
                darkTheme
                  ? "bg-darkBlue text-white"
                  : "bg-white shadow-lg text-veryDarkBlue"
              } h-12 w-12 rounded-sm hover:bg-opacity-70 grid place-items-center`}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>

            {new Array(5).fill(0).map((_, index) => {
              const totalTabs = Math.ceil(
                filteredCountries.length / ITEMS_PER_PAGE
              );

              let tabNumber = tab + index - 2;

              if (tabNumber < index + 1) tabNumber = index + 1;
              else if (tabNumber > totalTabs + index - 4)
                tabNumber = totalTabs + index - 4;

              return (
                index < totalTabs && (
                  <Link
                    to={`?tab=${tabNumber}`}
                    className={`${
                      darkTheme
                        ? "bg-darkBlue text-white"
                        : "bg-white shadow-lg text-veryDarkBlue"
                    } h-12 w-12 rounded-sm hover:bg-opacity-70 text-lg font-bold grid place-items-center`}
                  >
                    {tabNumber}
                  </Link>
                )
              );
            })}

            <Link
              to={`?tab=${
                tab * ITEMS_PER_PAGE <= filteredCountries.length ? tab + 1 : tab
              }`}
              className={`${
                darkTheme
                  ? "bg-darkBlue text-white"
                  : "bg-white shadow-lg text-veryDarkBlue"
              } h-12 w-12 rounded-sm hover:bg-opacity-70 grid place-items-center`}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
