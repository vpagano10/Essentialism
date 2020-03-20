import React, { useState, createContext } from "react";

export const TaskContext = createContext();

export const TaskProvider = props => {
  const [tasks, setTasks] = useState([
    {
      name: "Add Task(s)!",
      timeframe: "10 minutes",
      id: 23124
    },
    {
      name: "Add More Task(s)!",
      timeframe: "1 week",
      id: 23124
    },
    {
      name: "Add More Task(s)!",
      timeframe: "00/00/2020",
      id: 23124
    }
  ]);

  console.log("Tasks", tasks);

  return (
    <TaskContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TaskContext.Provider>
  );
};
