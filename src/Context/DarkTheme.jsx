import { useState, useContext, createContext } from "react";

const DarkThemeContext = createContext();

export const useDarkTheme = () => useContext(DarkThemeContext);

const DarkTheme = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <DarkThemeContext.Provider value={[darkTheme, setDarkTheme]}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export default DarkTheme;
