import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, FormLabel, Table } from "react-bootstrap";
import moment from "moment";
import { post } from "../../utils/agent";
import workValidation from "../login/WorkValidation";

function WorkEdit(props) {
  let dates = moment().format("DD-MM-YYYY");
  let times = moment().format("hh:mm");
  const [error, setError] = useState({});
  const [values, setValues] = useState({
    name: "",
    mob: "",
    service: "",
    price: "",
    status: "",
    // valid: false,
  });
  useEffect(() => {
    setValues(props.pass[0]);
    // console.log(props.pass[0]);
  }, []);
  //   status array

  const statuses = [
    {
      value: "pending",
    },
    {
      value: "completed",
    },
    {
      value: "resubmit",
    },
  ];

  // submit

  const submit = () => {
    let body = {};
    let keys = [
      "name",
      "mob",
      "status",
      "service",
      "price",
      "updatedDate",
      "updatedTime",
    ];
    for (let i = 0; i < keys.length; i++) {
      body[keys[i]] = values[keys[i]];
    }
    body._id = values._id;
    body.updatedDate = dates;
    body.updatedTime = times;
    body.name = values.name;

    post("/data/update", body)
      .then((result) => {
        // console.log(result);
        if (result) {
          window.location.reload(false);
        } else {
          alert("not updated");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(body);
  };

  // handler

  const setData = (event, key) => {
    setValues({ ...values, [key]: event.target.value });
    console.log(values);
  };
  //   console.log(props.pass);
  return (
    <div>
      {/* <h1>Edit</h1> */}
      <Form className="form" onSubmit={submit}>
        <Form.Group className="form-group">
          <Form.Label>Name</Form.Label>
          <FormControl
            className="input"
            type="input"
            required
            name="name"
            placeholder="name"
            onChange={(e) => setData(e, "name")}
            value={values.name}
          />
          {/* {error.name && (
            <FormLabel className="form-err">{error.name}</FormLabel>
          )} */}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Mobile</Form.Label>
          <FormControl
            className="input"
            type="tel"
            pattern="^\d{3}-\d{3}-\d{4}$"
            required
            name="mob"
            placeholder="mob"
            onChange={(e) => setData(e, "mob")}
            value={values.mob}
          />
          {/* {error.mob && <FormLabel className="form-err">{error.mob}</FormLabel>} */}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Status</Form.Label>
          <Form.Control
            className="input"
            as="select"
            name="status"
            value={values.status}
            onChange={(e) => setData(e, "status")}
          >
            {statuses.map((data, index) => (
              <option key={index} value={data.value}>
                {data.value}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>Service</Form.Label>
          <FormControl
            className="input"
            type="string"
            required
            name="service"
            placeholder="service"
            onChange={(e) => setData(e, "service")}
            value={values.service}
          />
          {/* {error.service && (
            <FormLabel className="form-err">{error.service}</FormLabel>
          )} */}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>price</Form.Label>
          <FormControl
            className="input"
            type="Number"
            required
            name="price"
            placeholder="price"
            onChange={(e) => setData(e, "price")}
            value={values.price}
          />
          {/* {error.price && (
            <FormLabel className="form-err">{error.price}</FormLabel>
          )} */}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label>submit</Form.Label>
          <Button onClick={() => submit()} style={{ margin: "1rem" }}>
            submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default WorkEdit;
