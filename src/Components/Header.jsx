import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as emptyMoon } from "@fortawesome/free-regular-svg-icons";
import { faMoon as filledMoon } from "@fortawesome/free-solid-svg-icons";
import { useDarkTheme } from "../Context/DarkTheme";
import { Link } from "react-router-dom";

const Header = () => {
  const [darkTheme, setDarkTheme] = useDarkTheme();
  return (
    <div
      className={`wrapper ${
        darkTheme ? "bg-darkBlue" : "bg-white shadow-md isolate"
      }`}
    >
      <div className="h-[60px] contain justify-between items-center">
        <Link
          to="/"
          className={`${
            darkTheme ? "text-white" : "text-veryDarkBlue"
          } font-semibold text-lg sm:text-xl`}
        >
          Where in the world?
        </Link>

        <button
          className={`${
            darkTheme ? "text-white" : "text-veryDarkBlue"
          } flex gap-3 items-center cursor-pointer`}
          onClick={() => setDarkTheme((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={darkTheme ? filledMoon : emptyMoon}
            className="-rotate-12"
          />
          <span
            className={`${
              darkTheme ? "text-white" : "text-veryDarkBlue"
            } font-semibold`}
          >
            Dark Mode
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
