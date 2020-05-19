// REACT
import React from "react";
import { Link, Route, withRouter } from "react-router-dom";

// COMPONENTS
import { getToken } from "../utils/Api";
import AccountHome from "./AccountHome";
import Home from "./Home";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./auth/Register";
import InitialPrompt from "./InitialPrompt";
import TaskHome from "./tasks/TaskHome";
import PromptEdits from "../components/PromptEdits";
import PillarEdits from "../components/PillarEdits";

// Styling
import styled from "styled-components";
import "../scss/NavBar.scss";

function NavBar() {
  const signedIn = getToken();

  return (
    <>
      <div>
        <nav className="top-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {!signedIn && (
            <Link className="nav-link" to="/register">
              Register
            </Link>
          )}
          {!signedIn && (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
          {signedIn && (
            <Link className="nav-link" to="/accounthome">
              My Account
            </Link>
          )}
          {signedIn && (
            <Link className="nav-link" to="/tasks">
              Tasks
            </Link>
          )}
          {signedIn && (
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          )}
        </nav>

        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <ProtectedRoute exact path="/initialprompt" component={InitialPrompt} />
        <ProtectedRoute exact path="/tasks" component={TaskHome} />
        <ProtectedRoute exact path="/accounthome" component={AccountHome} />
        <ProtectedRoute exact path="/logout" component={Logout} />
        <ProtectedRoute exact path="/promptedit/:id" component={PromptEdits} />
        <ProtectedRoute exact path="/pillaredit/:id" component={PillarEdits} />
      </div>
    </>
  );
}

export default withRouter(NavBar);
