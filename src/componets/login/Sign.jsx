import React, { useState } from "react";
import PropTypes from "prop-types";
import { postLogin } from "../../utils/agent";
import { Link } from "react-router-dom";
import Tilt from "react-tilt";
import Logo from "../../logo.png";

import {
  Button,
  Card,
  Form,
  FormControl,
  FormLabel,
  Alert,
} from "react-bootstrap";
import validation from "./Validation";
function Sign() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    valid: false,
  });
  const [error, setError] = useState({});
  const [alert, setAlert] = useState("");
  // handler

  const setData = (event, key) => {
    setValues({ ...values, [key]: event.target.value });
    // console.log(values);
  };
  // submit
  const submit = () => {
    let body = {};
    let keys = ["name", "email", "password"];
    for (let i = 0; i < keys.length; i++) {
      body[keys[i]] = values[keys[i]];
    }
    body.name = values.name;
    setError(validation(values));
    if (values.password == values.password2)
      postLogin("/user/create", body)
        .then((result) => {
          // console.log(result);
          // window.location.reload();
          // console.log(result.body.msg);
          setAlert(result.body.msg);
          // return <Alert color="primary">{result.body.msg}</Alert>;
        })
        .catch(console.log);

    // console.log(body);
  };

  const signStyle = {
    textTransform: "lowerCase !important",
  };

  return (
    <div
      className="loginPage"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
            borderRadius: "2rem",
            padding: "2rem",
          }}
        >
          <h2 className="sign-h1" style={{ color: "blue" }}>
            Create Login
          </h2>

          <div className="alerts">
            {alert === "account created" ? (
              <h4 style={{ color: "blue" }}>{alert}</h4>
            ) : (
              <h4 style={{ color: "red" }}>{alert}</h4>
            )}
          </div>
          {/* <h3 style={{ color: "red" }}>{alert}</h3> */}
          <Card.Img className="brand-logo" variant="top" src={Logo} />
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
            <Form.Group className="form-group">
              <FormLabel className="form-label" style={{ textAlign: "left" }}>
                Email
              </FormLabel>
              <FormControl
                autoFocus
                required
                className="input-login"
                type="string"
                name="email"
                placeholder="email"
                onChange={(e) => setData(e, "email")}
                value={values.email}
                style={signStyle}
              />
              {error.email && (
                <FormLabel className="form-err">{error.email}</FormLabel>
              )}
            </Form.Group>
            <Form.Group className="form-group">
              <FormLabel className="form-label">Name</FormLabel>
              <FormControl
                required
                className="input"
                type="string"
                name="name"
                placeholder="name"
                onChange={(e) => setData(e, "name")}
                value={values.name}
              />
              {/* {error.name && <p>{error.name}</p>} */}

              {error.name && (
                <FormLabel className="form-err">{error.name}</FormLabel>
              )}
            </Form.Group>
            <Form.Group className="form-group">
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
            </Form.Group>
            <Form.Group className="form-group">
              <FormLabel className="form-label">Confirm Password</FormLabel>
              <FormControl
                required
                className="input-login"
                type="password"
                name="password2"
                placeholder="confirm password"
                onChange={(e) => setData(e, "password2")}
                value={values.password2}
              />
              {error.password2 && (
                <FormLabel className="form-err">{error.password2}</FormLabel>
              )}
            </Form.Group>
            <Button className="sign-btn" onClick={() => submit()}>
              Sign
            </Button>
            <Link to="/">
              <a className="swap-login">Already an account</a>
            </Link>
          </Form>
        </Card>
      </Tilt>
    </div>
  );
}

export default Sign;
