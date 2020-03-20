import React, { useState } from "react";
import styled from "styled-components";

import "../../scss/CountMessages.scss";

function CountMessage(props) {
  const { currentCount, max } = props;

  return (
    <div className="counts">
      {currentCount}/{max}
    </div>
  );
}

export default CountMessage;
