import React from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

function TaskHome() {
  return (
    <div>
      <AddTask />
      <TaskList />
    </div>
  );
}

export default TaskHome;
