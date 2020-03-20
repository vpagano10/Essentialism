import React, { useState } from "react";
import { Link } from "react-router-dom";

import swal from "sweetalert";
import styled from "styled-components";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import api from "../../utils/Api";
import "../../scss/Register.scss";

function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault(props);
    api()
      .post("/api/auth/register", {
        username: username,
        password
      })
      .then(res => {
        console.log("Register endpoint", res);
        localStorage.setItem("token", res.data.token);
        swal({
          title: "Success!",
          text: "You're registered",
          icon: "success",
          button: "Let's Sign In"
        });
        props.history.push("/login");
      })
      .catch(err => {
        console.log("Error with register", err);
        swal({
          title: "Bummer!",
          text: "Registration Error",
          icon: "warning",
          dangerMode: true,
          button: "OK"
        });
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <TitleContainer>
            <CurrentTitle component="h1" variant="h5">
              <FormTitle>Sign Up</FormTitle>
              <LineUnderCurrentTitle />
            </CurrentTitle>
            <UnusedTitle component="h1" variant="h5">
              <FormTitle>
                <UnusedTitleLink to="/login">Login</UnusedTitleLink>
              </FormTitle>
            </UnusedTitle>
          </TitleContainer>
          <UnderlineDiv>
            <LineUnderTitles />
          </UnderlineDiv>
          <br />
          <br />
          <br />
          <h1>Sign Up</h1>
          <br />
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              type="text"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={event => setUsername(event.target.value)}
              autoFocus
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              InputProps={{ disableUnderline: true, className: classes.input }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <div>
              <FormBottomText>
                Have an account already? <Link to="/login">Login</Link> here.
              </FormBottomText>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Register;

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1520273288003-a449a25c5103?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1350&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  input: {
    fontSize: "1.6rem",
    borderBottom: "1px solid black"
  }
}));

const FormBottomText = styled.p`
  font-size: 1.4rem;
  text-align: left;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FormTitle = styled.h1`
  font-size: 2rem;
  margin: 0 3rem;
`;
const FormTitleMain = styled.h1`
  font-size: 3rem;
  margin: 0 3rem;
`;
const CurrentTitle = styled.span``;
const UnusedTitle = styled.span`
  opacity: 0.5;
`;
const RequiredLabel = styled.label`
  font-size: 1.4rem;
`;
const RequiredDiv = styled.div`
  text-align: center;
`;
const UnusedTitleLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 2rem;
`;
const UnderlineDiv = styled.div`
  width: 40%;
  position: absolute;
  margin-top: 28px;
`;
const LineUnderTitles = styled.hr`
  width: 100%;
  opacity: 0.5;
  position: relative;
`;
const LineUnderCurrentTitle = styled.hr`
  background-color: black;
  height: 2px;
  border: none;
`;
const RequiredStar = styled.big`
  color: red;
  font-size: 1.8rem;
`;
const GreyLabelText = styled.p`
  opacity: 0.8;
`;
