import React, { useState, useEffect, useContext } from "react";
import api from "../utils/Api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";
import "../scss/AccountHome.scss";

function AccountHome() {
  const [tasks, setTasks] = useContext(TaskContext);
  const [pillars, setPillars] = useState([]);
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    api()
      .get(`/api/users/${localStorage.getItem("id")}`)
      .then(res => {
        console.log(res);
        console.log(res.data.user.pillars);
        setPillars(res.data.user.pillars);
        setPrompts(res.data.user.prompts);
      })
      .catch(err => {
        console.log("Error with get AH", err);
      });
  }, []);

  const deletePillars = (event, pillar) => {
    event.preventDefault();
    console.log("Delete pillars id", pillar.id);
    api()
      .delete(`/api/pillars/${pillar.id}`)
      .then(res => {
        console.log("Delete console log", res);
        // this.props.history.push('/accounthome')
        api()
          .get(`/api/users/${localStorage.getItem("id")}`)
          .then(res => {
            console.log(res);
            console.log(res.data.user.pillars);
            setPillars(res.data.user.pillars);
            setPrompts(res.data.user.prompts);
          })
          .catch(err => {
            console.log("Error with get AH", err);
          });
      })
      .catch(err => {
        console.log("Delete pillar error", err);
      });
  };

  const deletePrompts = (event, prompt) => {
    event.preventDefault();
    console.log("Delete prompt id", prompt.id);
    api()
      .delete(`/api/prompts/${prompt.id}`)
      .then(res => {
        console.log("Delete console log", res);
        // this.props.history.push('/accounthome')
        api()
          .get(`/api/users/${localStorage.getItem("id")}`)
          .then(res => {
            console.log(res);
            console.log(res.data.user.pillars);
            setPillars(res.data.user.pillars);
            setPrompts(res.data.user.prompts);
          })
          .catch(err => {
            console.log("Error with get AH", err);
          });
      })
      .catch(err => {
        console.log("Delete prompt error", err);
      });
  };

  return (
    <div className="account-container">
      {/* top */}
      {pillars.length < 1 && prompts.length < 1 ? (
        <span>
          <h1>Welcome!</h1>
          <p>
            Use the Add button below to begin building out your pillars and
            prompts!
          </p>
          <p>
            <Link to="/initialprompt">Add</Link>
          </p>
        </span>
      ) : (
        <span>
          <p>
            If you wish to update your profile or the prompts below no longer
            fit you, <br /> edit your prompts or delete all pillars + prompts
            below to make new selections.
          </p>
        </span>
      )}
      {/* top */}

      {/* Pillars */}
      <h1>My Pillars</h1>
      {pillars.map(pillar => (
        <div className="pillar-container">
          <span>
            {pillar.top === true ? (
              <p className="top-pillar" key={pillar.id}>
                {pillar.pillar}
              </p>
            ) : (
              <p key={pillar.id}>{pillar.pillar}</p>
            )}
          </span>
          <span className="pillar-options">
            <span>
              {/* <Link className="edit-link" to={`/pillaredit/${pillar.id}`}>
                Edit
              </Link> */}
            </span>
            <p onClick={e => deletePillars(e, pillar)}>❌</p>
          </span>
        </div>
      ))}
      {/* Pillars */}

      <br />

      {/* Prompts */}
      <h1>My Prompts</h1>
      <div className="prompt-container">
        {prompts.map(prompt => (
          <div>
            <div className="textareas">
              <span className="prompt-buttons">
                <p>
                  <Link className="edit-link" to={`/promptedit/${prompt.id}`}>
                    Edit
                  </Link>
                </p>
                <p onClick={e => deletePrompts(e, prompt)}>❌</p>
              </span>
              <span>{prompt.prompt}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Prompts */}

      <div>
        <Link to="/tasks">
          <p>Tasks: {tasks.length}</p>
        </Link>
      </div>
    </div>
  );
}

export default AccountHome;
