import React, { useState, useContext } from "react";
import Task from "./Task";
import { TaskContext } from "../../context/TaskContext";
import styled from "styled-components";

import "../../scss/Tasks.scss";

const TaskList = () => {
  const [tasks, setTasks] = useContext(TaskContext);

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div>
          <Task name={task.name} timeframe={task.timeframe} key={task.id} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
