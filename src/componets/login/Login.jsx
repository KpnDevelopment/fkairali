import React, { useState } from "react";
import PropTypes from "prop-types";
import { postLogin } from "../../utils/agent";
import { Link } from "react-router-dom";
import { Button, Card, Form, FormControl, FormLabel } from "react-bootstrap";
import validation from "./Validation";
import "../works/work.css";
import Tilt from "react-tilt";
import Logo from "../../logo.png";
import {
  BeatLoader,
  BounceLoader,
  BarLoader,
  ClimbingBoxLoader,
} from "react-spinners";
import { css } from "@emotion/react";
function Login() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // handle data

  const setData = (event, key) => {
    setValues({ ...values, [key]: event.target.value });
    // console.log(values);
  };

  // submit
  const submit = () => {
    setLoading(true);
    let body = {};
    let keys = ["email", "password"];
    for (let i = 0; i < keys.length; i++) {
      body[keys[i]] = values[keys[i]];
    }
    body.name = values.name;
    setError(validation(values));
    postLogin("/user/login", body)
      .then((response) => {
        // console.log(response);
        setAlert(response.body.msg);
        window.localStorage.setItem("auth-key", response.body.token);
        window.localStorage.setItem("user", response.body.id);
        setLoading(false);
        window.location.reload(false);
      })
      .catch(console.log);

    // console.log(body);
  };
  const override = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    background: "white",
    backgroundColor: "red",
    zIndex: "999",
    width: "100vw",
    height: "100vh",
  };

  return (
    <div
      className="dic"
      style={{
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div
        className="loginPage"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: "0.3",
          zIndex: "-1",
          // marginTop: "10rem",
        }}
      >
        <Tilt
          className="Tilt"
          options={{
            reverse: true, // reverse the tilt direction
            max: 12, // max tilt rotation (degrees)
            perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
            scale: 1, // 2 = 200%, 1.5 = 150%, etc..
            speed: 300, // Speed of the enter/exit transition
            transition: true, // Set a transition on enter/exit.
            axis: null, // What axis should be disabled. Can be X or Y.
            reset: true, // If the tilt effect has to be reset on exit.
            easing: "cubic-bezier(.03,.98,.52,.99)",
          }}
        >
          <Card
            className="loginCard"
            style={{
              display: "flex",
              alignItems: "center",
              width: "30rem",
              padding: "1rem",
              borderRadius: "2rem",
              padding: "4rem",
            }}
          >
            <h2 className="sign-h1" style={{ color: "blue" }}>
              Login
            </h2>
            <Card.Img className="brand-logo" variant="top" src={Logo} />
            <Button onClick={() => setLoading(true)}>load</Button>
            <h5>{alert}</h5>
            <Form
              size="lg"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onSubmit={submit}
            >
              <FormLabel className="form-label">Email</FormLabel>
              <FormControl
                autoFocus
                required
                className="input-login"
                type="string"
                name="email"
                placeholder="email"
                onChange={(e) => setData(e, "email")}
                value={values.email}
              />
              {error.email && (
                <FormLabel className="form-err">{error.email}</FormLabel>
              )}
              <FormLabel className="form-label">Password</FormLabel>
              <FormControl
                required
                className="input-login"
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setData(e, "password")}
                value={values.password}
              />
              {error.password && (
                <FormLabel className="form-err">{error.password}</FormLabel>
              )}
              <Button className="sign-btn" onClick={() => submit()}>
                login
              </Button>
              <Link to="/sign">
                <a className="swap-login">Create an account</a>
              </Link>
            </Form>
            <div className="svg-icon"></div>
          </Card>
        </Tilt>
      </div>
      <BounceLoader
        color={"red"}
        style={override}
        loading={loading}
        size={215}
      />
    </div>
  );
}

export default Login;
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
