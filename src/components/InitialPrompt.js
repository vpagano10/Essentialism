import React, { useState, useEffect } from "react";
import styled from "styled-components";
import swal from "sweetalert";

//import content from "../utils/initialPromptContent";
import PillarCheckboxes from "./formQuestions/PillarCheckboxes";
import ValidationMessage from "./formValidation/ValidationMessage";
import CountMessage from "./formValidation/CountMessage";
import TextFieldQuestions from "./formQuestions/TextFieldQuestions";
import api from "../utils/Api";

import "../scss/PromptQuestions.scss";

function InitialPrompt(props) {
  // MARK: - Array of Objects
  const pillars = [];
  const prompts = [];

  // MARK: - Hook States
  const [container, setContainer] = useState([]);
  const [containerLength, setContainerLength] = useState(0);

  const [topThreeContainer, setTopThreeContainer] = useState([]);
  const [topThreeContainerLength, setTopThreeContainerLength] = useState(0);

  const maxLengthFirstPicks = 7;
  const maxLengthSecondPicks = 3;

  const [textFieldOne, setTextFieldOne] = useState("");
  const [textFieldTwo, setTextFieldTwo] = useState("");

  // MARK: - Validation Message State
  const [containerValidationMessage, setContainerValidationMessage] = useState(
    ""
  );
  const [
    topThreeContainerValidationMessage,
    setTopThreeContainerValidationMessage
  ] = useState("");

  // MARK: - Object Creation for POST
  function createFormOneForPOST() {
    container.map(value => {
      let object = {};
      object["user_id"] = localStorage.getItem("id");
      object["pillar"] = value;
      if (isTop(value)) {
        object["top"] = true;
      } else {
        object["top"] = false;
      }
      pillars.push(object);
    });
  }

  function createFormTwoForPOST() {
    let object = {};
    object["prompt"] = textFieldOne;
    object["user_id"] = localStorage.getItem("id");
    prompts.push(object);
    let object2 = {};
    object2["prompt"] = textFieldTwo;
    object2["user_id"] = localStorage.getItem("id");
    prompts.push(object2);
  }

  // MARK: - Axios Call
  const handleSubmit = event => {
    event.preventDefault();

    if (containerLength == 0 || topThreeContainerLength == 0) {
      swal({
        title: "Hold up!",
        text:
          "Please pick 7 interests and 3 of your top interests before submitting",
        icon: "warning",
        dangerMode: true
      });
    } else if (textFieldOne === "" || textFieldTwo === "") {
      swal({
        title: "The prompts are empty!",
        text: "Please fill in the prompts",
        icon: "warning",
        dangerMode: true
      });
    } else if (
      containerValidationMessage === "✔︎" &&
      topThreeContainerValidationMessage === "✔︎"
    ) {
      createFormOneForPOST();
      api()
        .post(`/api/pillars`, pillars)
        .then(res => {
          console.log("Pillar post res", res);
        })
        .catch(err => {
          console.log("Pillar post err", err);
        });

      createFormTwoForPOST();
      api()
        .post(`/api/prompts`, prompts)
        .then(res => {
          console.log("Prompt post res", res);
        })
        .catch(err => {
          console.log("Prompt post err", err);
        });
      props.history.push("/accounthome");
    } else {
      swal({
        title: "Something went wrong",
        icon: "warning",
        dangerMode: true
      });
    }
  };

  // MARK: - Check if to see if checked in top three
  function isTop(value) {
    for (let i = 0; i < topThreeContainer.length; i++) {
      if (value === topThreeContainer[i]) {
        return true;
      }
    }
    return false;
  }

  // MARK: - MOCK sending data
  const mockSend = event => {
    event.preventDefault();
    container.map(value => {
      let object = {};
      object["user_id"] = localStorage.getItem("id");
      object["pillar"] = value;
      if (isTop(value)) {
        object["top"] = true;
      } else {
        object["top"] = false;
      }
      pillars.push(object);
    });
    console.log(pillars);
  };

  // MARK: - Render HTML
  return (
    <div>
      <PillarCheckboxes
        container={container}
        setContainer={setContainer}
        containerLength={containerLength}
        setContainerLength={setContainerLength}
        topThreeContainer={topThreeContainer}
        setTopThreeContainer={setTopThreeContainer}
        topThreeContainerLength={topThreeContainerLength}
        setTopThreeContainerLength={setTopThreeContainerLength}
        maxLengthFirstPicks={maxLengthFirstPicks}
        maxLengthSecondPicks={maxLengthSecondPicks}
        containerValidationMessage={containerValidationMessage}
        setContainerValidationMessage={setContainerValidationMessage}
        topThreeContainerValidationMessage={topThreeContainerValidationMessage}
        setTopThreeContainerValidationMessage={
          setTopThreeContainerValidationMessage
        }
      />
      <TextFieldQuestions
        id="promptQuestions"
        textFieldOne={textFieldOne}
        setTextFieldOne={setTextFieldOne}
        textFieldTwo={textFieldTwo}
        setTextFieldTwo={setTextFieldTwo}
      />
      <button
        className="submit-button"
        id="submitButton"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default InitialPrompt;
