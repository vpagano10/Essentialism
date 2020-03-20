import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import InitialPrompt from "./InitialPrompt";

function PillarEdits(props) {
  const [pillar, setPillar] = useState({
    id: "",
    pillar: ""
  });

  useEffect(() => {
    api()
      .get(`/api/pillars/${props.match.params.id}`)
      .then(res => {
        setPillar(res.data);
      })
      .catch(err => {
        console.log("Pillar edit error", err);
      });
  }, [props.match.params.id]);

  const handleChange = event => {
    setPillar({
      ...pillar,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    api()
      .put(`/api/pillars/${props.match.params.id}`, pillar)
      .then(res => {
        props.history.push("/accounthome");
      })
      .catch(err => {
        console.log("Error with edit put req", err);
      });
  };

  return (
    <>
      <InitialPrompt />
    </>
  );
}

export default PillarEdits;
