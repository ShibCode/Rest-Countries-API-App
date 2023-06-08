import React from "react";
import { Link } from "react-router-dom";
import { useDarkTheme } from "../Context/DarkTheme";

const Flag = ({ country }) => {
  const [darkTheme] = useDarkTheme();

  return (
    <div
      className={`${
        darkTheme ? "bg-darkBlue" : "bg-white shadow-lg"
      } w-full max-w-[300px] sm:max-w-none`}
    >
      <Link to={`/detail?country=${country.cca3.toLowerCase()}`}>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          className="h-[150px] w-full"
        />

        <div className="p-4 flex flex-col gap-2">
          <div
            className={`${
              darkTheme ? "text-white" : "text-veryDarkBlue"
            } font-bold text-lg`}
          >
            {country.name.common}
          </div>

          <div>
            <div>
              <span
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } text-sm`}
              >
                Popuation:{" "}
              </span>
              <span
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } opacity-80 text-sm`}
              >
                {country.population.toLocaleString()}
              </span>
            </div>

            <div>
              <span
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } text-sm`}
              >
                Region:{" "}
              </span>
              <span
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } opacity-80 text-sm`}
              >
                {country.region}
              </span>
            </div>

            <div>
              <span
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } text-sm`}
              >
                Capital:{" "}
              </span>
              <span
                className={`${
                  darkTheme ? "text-white" : "text-veryDarkBlue"
                } opacity-80 text-sm`}
              >
                {country.capital}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Flag;
