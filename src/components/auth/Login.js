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
import "../../scss/Login.scss";

function Login(props) {
  const classes = useStyles();
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = event => {
    event.preventDefault();
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    api()
      .post("/api/auth/login", data)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.userId);
        swal({ title: "🙌", text: "Success", icon: "success" });
        props.history.push("/accounthome");
      })
      .catch(err => {
        swal({
          title: "Error!",
          text:
            "We couldn't log you in. Please check that your username and password are correct.",
          icon: "warning",
          dangerMode: true
        });
        console.log(err);
      });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <TitleContainer>
            <UnusedTitle component="h1" variant="h5">
              <FormTitle>
                <UnusedTitleLink to="/register">Sign Up</UnusedTitleLink>
              </FormTitle>
            </UnusedTitle>
            <CurrentTitle component="h1" variant="h5">
              <FormTitle>Login</FormTitle>
              <LineUnderCurrentTitle />
            </CurrentTitle>
          </TitleContainer>
          <UnderlineDiv>
            <LineUnderTitles />
          </UnderlineDiv>
          <br />
          <br />
          <br />
          <h1>Login</h1>
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
              value={data.username}
              onChange={handleChange}
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
              value={data.password}
              onChange={handleChange}
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
                Dont't have an account? <Link to="/register">Sign Up</Link>{" "}
                here.
              </FormBottomText>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;

//

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1498855592392-af2bf1e0a4c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
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
