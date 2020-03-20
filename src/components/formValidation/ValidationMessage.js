import React, { useState } from "react";
import styled from "styled-components";

import "../../scss/CountMessages.scss";

function ValidationMessage(props) {
  const { message } = props;

  const [visible, setVisible] = useState(false);

  return (
    <div className="validation">
      {message === "✔︎" ? (
        <div>{message}</div>
      ) : (
        <div isOpen={visible}>{message}</div>
      )}
    </div>
  );
}

export default ValidationMessage;
