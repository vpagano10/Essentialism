import React, { useState, useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import styled from "styled-components";

import "../../scss/Tasks.scss";

const AddTask = () => {
  const [name, setName] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [tasks, setTasks] = useContext(TaskContext);

  const updateName = event => {
    setName(event.target.value);
  };

  const updateTimeframe = event => {
    setTimeframe(event.target.value);
  };

  const addTask = event => {
    event.preventDefault();
    setTasks(prevTasks => [...prevTasks, { name: name, timeframe: timeframe }]);
  };

  return (
    <div className="task-page-container">
      <h1>Task List</h1>
      <p>
        Use this page as a list that helps you focus on your goals. Reference
        the pillars you chose as well as your prompts to develop tasks. These
        tasks should be smaller breakdowns of your overall challenges. Be sure
        to name your tasks accordingly so you know exactly what your seeking to
        accomplish as well as a realistic timeframe.
      </p>
      <form className="task-form" onSubmit={addTask}>
        <h2>Create Task</h2>
        <input
          type="text"
          name="name"
          placeholder="task name"
          value={name}
          onChange={updateName}
        />
        <br />
        <input
          type="text"
          name="timeframe"
          placeholder="time to complete"
          value={timeframe}
          onChange={updateTimeframe}
        />
        <br />
        <button>Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
