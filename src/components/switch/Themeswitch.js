import React from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import "./Themeswitch.css";
export default function Themeswitch() {
  const { theme, dispatch } = useThemeContext();
  const switchTheme = () => {
    if (theme === "light") {
      dispatch({ type: "DARK" });
    } else {
      dispatch({ type: "LIGHT" });
    }
    console.log(theme);
  };
  return (
    <div className="container">
      <div className="form-check form-switch">
        <input
          className="form-check-input toggle"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onClick={switchTheme}
        />
      </div>
    </div>
  );
}
