import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import styled from "styled-components";

function PromptEdits(props) {
  const [prompt, setPrompt] = useState({
    id: "",
    prompt: ""
  });

  useEffect(() => {
    api()
      .get(`/api/prompts/${props.match.params.id}`)
      .then(res => {
        setPrompt(res.data);
      })
      .catch(err => {
        console.log("Prompt edit error", err);
      });
  }, [props.match.params.id]);

  const handleChange = event => {
    setPrompt({
      ...prompt,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    api()
      .put(`/api/prompts/${props.match.params.id}`, prompt)
      .then(res => {
        props.history.push("/accounthome");
      })
      .catch(err => {
        console.log("Error with edit put req", err);
      });
  };

  return (
    <>
      <h1>Update Prompt</h1>
      <p>Prompt 1: Why are these values important to you?</p>
      <p>Prompt 2: What projects are you involved in?</p>
      <form onSubmit={handleSubmit}>
        <input
          type="textarea"
          name="prompt"
          placeholder="prompt"
          value={prompt.prompt}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default PromptEdits;
