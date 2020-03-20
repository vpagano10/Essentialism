import React, { useState, useEffect } from "react";
import styled from "styled-components";

import content from "../../utils/initialPromptContent";
import CountMessage from "../formValidation/CountMessage";
import ValidationMessage from "../formValidation/ValidationMessage";
import api from "../../utils/Api";

import "../../scss/PillarCheckboxes.scss";

function PillarCheckboxes(props) {
  const {
    container,
    setContainer,
    containerLength,
    setContainerLength,
    topThreeContainer,
    setTopThreeContainer,
    topThreeContainerLength,
    setTopThreeContainerLength,
    maxLengthFirstPicks,
    maxLengthSecondPicks,
    containerValidationMessage,
    setContainerValidationMessage,
    topThreeContainerValidationMessage,
    setTopThreeContainerValidationMessage
  } = props;

  // MARK: - useEffects
  useEffect(() => {
    if (containerLength === maxLengthFirstPicks) {
      console.log("Hit 7");
      setContainerValidationMessage("✔︎");
      // check to what not picked and then disable
      //cssIdentifier, repo, repoLength, maxRepoLength
      checkToDisableOrEnableFor(
        ".checkbox-1",
        container,
        containerLength,
        maxLengthFirstPicks
      );
    }
    if (
      containerValidationMessage === "✔︎" &&
      containerLength < maxLengthFirstPicks
    ) {
      setContainerValidationMessage("To continue, you must pick 7 interests");
      checkToDisableOrEnableFor(
        ".checkbox-1",
        container,
        containerLength,
        maxLengthFirstPicks
      );
    }
  }, [containerLength]);

  useEffect(() => {
    console.log(topThreeContainerLength);
    if (topThreeContainerLength === maxLengthSecondPicks) {
      console.log("Hit 3");
      setTopThreeContainerValidationMessage("✔︎");
      checkToDisableOrEnableFor(
        ".checkbox-2",
        topThreeContainer,
        topThreeContainerLength,
        maxLengthSecondPicks
      );
    }

    if (
      topThreeContainerValidationMessage === "✔︎" &&
      topThreeContainerLength < maxLengthSecondPicks
    ) {
      setTopThreeContainerValidationMessage(
        "To contine, you must pick your top 3"
      );
      checkToDisableOrEnableFor(
        ".checkbox-2",
        topThreeContainer,
        topThreeContainerLength,
        maxLengthSecondPicks
      );
    }
  }, [topThreeContainerLength]);

  // MARK: - Event Listeners
  // toggle for checkboxes
  const toggle = event => {
    if (
      event.target.checked === true &&
      !container.includes(event.target.value)
    ) {
      add(event, container, setContainer, containerLength, setContainerLength);
    } else if (
      event.target.checked === false &&
      container.includes(event.target.value)
    ) {
      remove(
        event,
        container,
        setContainer,
        containerLength,
        setContainerLength
      );
    } else {
      console.log(
        "You should never get to this statement! You did something wrong"
      );
    }
  };

  const topThreeToggle = event => {
    if (
      event.target.checked === true &&
      !topThreeContainer.includes(event.target.value)
    ) {
      add(
        event,
        topThreeContainer,
        setTopThreeContainer,
        topThreeContainerLength,
        setTopThreeContainerLength
      );
    } else if (
      event.target.checked === false &&
      topThreeContainer.includes(event.target.value)
    ) {
      remove(
        event,
        topThreeContainer,
        setTopThreeContainer,
        topThreeContainerLength,
        setTopThreeContainerLength
      );
    } else {
      console.log(
        "You should never get to this statement! You did something wrong"
      );
    }
  };

  // MARK: - ABSTRACTED Adding and Removing from containers (called repos)
  function add(event, repo, setRepo, repoLength, setRepoLength) {
    repo.push(event.target.value);
    setRepoLength(repoLength + 1);
    setRepo(repo);
  }

  function remove(event, repo, setRepo, repoLength, setRepoLength) {
    repo.map((pillar, index) => {
      if (pillar === event.target.value) {
        repo.splice(index, 1);
        setRepoLength(repoLength - 1);
        return setRepo(repo);
      }
    });
  }

  // MARK: - Checkbox selector
  function getCheckboxesFor(cssIdentifier) {
    const allInputsNodeList = document.querySelectorAll(cssIdentifier);
    const checkboxes = Array.from(allInputsNodeList);
    return checkboxes;
  }

  // MARK: - Checkbox check
  function checkToDisableOrEnableFor(
    cssIdentifier,
    repo,
    repoLength,
    maxRepoLength
  ) {
    const notCheckedArray = getCheckboxesFor(cssIdentifier).filter(
      object => !repo.includes(object.name)
    );
    console.log(notCheckedArray);
    if (repoLength === maxRepoLength) {
      return notCheckedArray.forEach(object => (object.disabled = true));
    } else {
      return notCheckedArray.forEach(object => (object.disabled = false));
    }
  }

  return (
    <div className="pillars-container">
      <h1>Pick 7 interests from the list below</h1>
      <form>
        <ValidationMessage message={containerValidationMessage} />
        <CountMessage
          currentCount={containerLength}
          max={maxLengthFirstPicks}
        />
        <div className="top-pillars">
          {content.map((name, index) => (
            <div className="pillar" key={index}>
              <input
                className="checkbox-1"
                type="checkbox"
                name={name}
                value={name}
                onChange={toggle}
              ></input>
              <label>{name}</label>
              <br />
            </div>
          ))}
        </div>
      </form>
      <hr />
      <form>
        <ValidationMessage message={topThreeContainerValidationMessage} />
        <CountMessage
          currentCount={topThreeContainerLength}
          max={maxLengthSecondPicks}
        />
        <div className="top-pillars">
          {container.map((name, index) => (
            <div className="pillar" key={index}>
              <input
                className="checkbox-2"
                type="checkbox"
                name={name}
                value={name}
                onChange={topThreeToggle}
              ></input>
              <label>{name}</label>
              <br />
            </div>
          ))}
        </div>
      </form>
      <hr />
    </div>
  );
}

export default PillarCheckboxes;
