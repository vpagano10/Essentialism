import React, { useState } from "react";
import styled from "styled-components";
import ValidationMessage from "../formValidation/ValidationMessage";

import "../../scss/PromptQuestions.scss";

function TextFieldQuestions(props) {
  // MARK: - passing props
  const {
    textFieldOne,
    setTextFieldOne,
    textFieldTwo,
    setTextFieldTwo
  } = props;

  // MARK: - hooks for validation message
  const [
    textFieldOneValidationMessage,
    setTextFieldOneValidationMessage
  ] = useState("");
  const [
    textFieldTwoValidationMessage,
    setTextFieldTwoValidationMessage
  ] = useState("");

  // MARK: - event listeners
  function hasChangedTextFieldOne(event) {
    if (event.target.value === "") {
      setTextFieldOne("");
      setTextFieldOneValidationMessage(
        "It's important for you to write in your why's into the textfield"
      );
    } else {
      setTextFieldOne(event.target.value);
      console.log("t1", textFieldOne);
      setTextFieldOneValidationMessage("✔︎");
    }
  }

  function hasChangedTextFieldTwo(event) {
    if (event.target.value === "") {
      setTextFieldTwo("");
      setTextFieldTwoValidationMessage(
        "Please place all the projects that you are working on in the textfield below"
      );
    } else {
      setTextFieldTwo(event.target.value);
      console.log("t2", textFieldTwo);
      setTextFieldTwoValidationMessage("✔︎");
    }
  }

  // MARK: - Render HTML
  return (
    <form className="prompt-container">
      <div>
        <ValidationMessage message={textFieldOneValidationMessage} />
        <p>Why are these values important to you?</p>
        <textarea
          className="textareas"
          name="promptone"
          placeholder=" These values are important to me because..."
          onChange={hasChangedTextFieldOne}
        />
        <br />
      </div>
      <div>
        <ValidationMessage message={textFieldTwoValidationMessage} />
        <p>What projects are you involved in?</p>
        <textarea
          className="textareas"
          name="promptwo"
          placeholder=" Some projects I am currently working on include..."
          onChange={hasChangedTextFieldTwo}
        />
        <br />
      </div>
    </form>
  );
}

export default TextFieldQuestions;
