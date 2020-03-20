// REACT
import React from "react";

// COMPONENTS
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { TaskProvider } from "./context/TaskContext";
import TaskList from "./components/tasks/TaskList";
import AddTask from "./components/tasks/AddTask";

// STYLING
import styled from "styled-components";
import "./App.css";

const AppDiv = styled.div`
  text-align: center;
`;

function App() {
  return (
    <AppDiv>
      <TaskProvider>
        <NavBar />
        <Footer />
      </TaskProvider>
    </AppDiv>
  );
}

export default App;
