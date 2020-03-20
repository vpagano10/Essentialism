import React, { useContext } from "react";
import styled from "styled-components";
import { useDarkMode } from "../specialHooks/useDarkMode";
// import { TaskContext } from '../context/TaskContext';
import { getToken } from "../utils/Api";

function Footer() {
  // const [tasks, setTasks] = useContext(TaskContext);
  const [darkMode, setDarkMode] = useDarkMode();
  const signedIn = getToken();

  const toggleMode = event => {
    event.preventDefault();
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div>
        <div>
          <div
            onClick={toggleMode}
            className={darkMode ? "toggle toggled" : "toggle"}
          />
        </div>
      </div>
    </>
  );
}

export default Footer;
