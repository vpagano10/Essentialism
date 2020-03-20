import React, { useState } from "react";

import "../../scss/Tasks.scss";

const Task = props => {
  return (
    <div className="task">
      <h3>{props.name}</h3>
      <p>{props.timeframe}</p>
    </div>
  );
};

export default Task;
