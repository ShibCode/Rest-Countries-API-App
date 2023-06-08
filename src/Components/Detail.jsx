import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDarkTheme } from "../Context/DarkTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Detail = ({ getCountry, loaded }) => {
  const [country, setCountry] = useState({});

  const location = useLocation();
  const [darkTheme] = useDarkTheme();

  useEffect(() => {
    const slug = location.search.substring(9, location.search.length);

    if (loaded) setCountry(getCountry(slug));
  }, [location, loaded]);

  return (
    Object.keys(country).length > 0 && (
      <div
        className={`wrapper min-h-[calc(100vh-60px)] ${
          darkTheme ? "bg-veryDarkBlue" : "bg-white"
        }`}
      >
        <div className="contain flex-col items-start py-12 lg:py-16 gap-12 lg:gap-16">
          <div className="w-full max-w-[450px] lg:max-w-none mx-auto">
            <button
              className={`${
                darkTheme
                  ? "bg-darkBlue text-white"
                  : "bg-white text-veryDarkBlue"
              } py-2 w-36 shadow-lg`}
              onClick={() => {
                window.history.back();
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>
          </div>
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-12">
            <div className="w-full max-w-[450px] lg:min-w-[400px]">
              <img
                src={country.flags.png}
                alt={country.flag}
                className="w-full aspect-[5/3]"
              />
            </div>

            <div className="lg:p-4 w-full max-w-[450px] lg:max-w-[600px] flex flex-col gap-6">
              <div
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } font-bold text-2xl sm:text-3xl`}
              >
                {country.name.common}
              </div>
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 justify-between">
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Popuation:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {country.population.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Region:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {country.region}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Sub Region:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {country.subregion}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Capital:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {country.capital}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Top Level Domain:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {country.tld?.map((tld) => {
                        return <span>{tld}</span>;
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Currencies:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {Object.keys(
                        country.currencies ? country.currencies : []
                      ).map((currency, index) => {
                        let isContinuing = true;
                        if (currency)
                          isContinuing =
                            index !==
                            Object.keys(country.currencies).length - 1;

                        return (
                          <span>
                            {country.currencies[currency].name}{" "}
                            {isContinuing && ", "}
                          </span>
                        );
                      })}
                    </span>
                  </div>

                  <div>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      }`}
                    >
                      Languages:{" "}
                    </span>
                    <span
                      className={`${
                        darkTheme ? "text-white" : "text-veryDarkBlue"
                      } opacity-80`}
                    >
                      {Object.keys(
                        country.languages ? country.languages : []
                      ).map((language, index) => {
                        let isContinuing = true;
                        if (language)
                          isContinuing =
                            index !== Object.keys(country.languages).length - 1;

                        return (
                          <span>
                            {country.languages[language]} {isContinuing && ", "}
                          </span>
                        );
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <span
                  className={`${
                    darkTheme ? "text-white" : "text-veryDarkBlue"
                  }`}
                >
                  Border Countries:{" "}
                </span>{" "}
                {country.borders?.map((border) => (
                  <Link
                    to={`/detail?country=${border.toLowerCase()}`}
                    className={`${
                      darkTheme
                        ? "bg-darkBlue text-white border-transparent"
                        : "bg-white text-veryDarkBlue border-gray-300"
                    } py-2 px-4 opacity-80 cursor-pointer border-2`}
                  >
                    {border}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Detail;
