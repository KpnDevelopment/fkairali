import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  Table,
  Modal,
  FormLabel,
  Card,
} from "react-bootstrap";
import { post } from "../../utils/agent";
// import moment from "moment";
import WorkEdit from "./WorkEdit";
import WorkInfo from "./WorkInfo";
import "./work.css";
import workValidation from "../login/WorkValidation";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      className="dialog-model "
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <div className="main-div">
        <Modal.Header closeButton>
          <Modal.Title
            className="model-title"
            id="contained-modal-title-center"
          >
            {props.pass.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body ">
          {/* <h5>
          <span className="model-label">mob:</span>
          {props.pass.mob}
        </h5>
        <h5>
          <span className="model-label">Service :</span>
          {props.pass.service}
        </h5>
        <h5>
          <span className="model-label">status :</span>
          {props.pass.status}
        </h5>
        <h5>
          <span className="model-label">price :</span>
          {props.pass.price}
        </h5>
        <h5>
          <span className="model-label">last update at :</span>
          {props.pass.updatedDate}
        </h5>
        <h5>
          <span className="model-label">last update at :</span>
          {props.pass.updatedTime}
        </h5>
        <h5>
          <span className="model-label">date :</span>
          {props.pass.date}
        </h5> */}

          <Table className="model-table" style={{ border: "none" }}>
            <tr className="model-tr">
              <td className="table-field">mob </td>
              <td className="table-data">{props.pass.mob}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">Service </td>
              <td className="table-data">{props.pass.service}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">status </td>
              <td className="table-data">{props.pass.status}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">price </td>
              <td className="table-data">{"₹" + props.pass.price}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">updatedDate </td>
              <td className="table-data">{props.pass.updatedDate}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">Service </td>
              <td className="table-data">{props.pass.service}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">updatedTime </td>
              <td className="table-data">{props.pass.updatedTime}</td>
            </tr>
            <tr className="model-tr">
              <td className="table-field">Date </td>
              <td className="table-data">{props.pass.date}</td>
            </tr>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button className="sign-btn" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

function Work() {
  const [mount, setmount] = useState(false);
  const [info, setInfo] = useState(false);
  const [infoPass, setInfoPass] = useState([]);
  const [passData, setPassData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userKey, setUserKey] = useState(localStorage.getItem("user"));
  const [work, setWork] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [alert, setAlert] = useState("");
  const [error, setError] = useState({});

  const [values, setValues] = useState({
    name: "",
    mob: "",
    service: "",
    price: "",
  });
  const [valid, setValid] = useState(false);
  useEffect(() => {
    fetchWrk();
    // console.log({ userKey: userKey });
  }, []);
  // fetch works

  const fetchWrk = async () => {
    let response = await post("/data/sort", { userId: userKey }).then(
      (response) => {
        // console.log(response.body.doc);
        if (!response) {
          localStorage.clear();
          window.location.href = "/";
        }
        setWork(response.body.doc);
      }
    );
  };

  // count price

  const totalAmount = work.reduce((currentTotal, work) => {
    return parseInt(work.price) + currentTotal;
  }, 0);

  // submit

  const submit = () => {
    let body = {};
    let keys = ["name", "mob", "service", "price", "userId"];
    for (let i = 0; i < keys.length; i++) {
      body[keys[i]] = values[keys[i]];
    }
    body.userId = userKey;
    body.name = values.name;
    setError(workValidation(values));
    setValid(!valid);
    if (valid == true) {
      post("/data/create", body)
        .then((result) => {
          // console.log(result);
          if (result) {
            window.location.reload(false);
          }
        })
        .catch(console.log);

      // console.log(body);
    }
  };

  // handler

  const setData = (event, key) => {
    setValues({ ...values, [key]: event.target.value });
    // console.log(values);
  };

  // search data

  function handleChange(event) {
    setSearchTerm(event.target.value);
    // console.log(searchTerm);
  }

  return (
    <div className="container">
      <Form
        className="form"
        style={{ display: "flex", flexDirection: "row", marginTop: "5rem" }}
        onSubmit={submit}
      >
        <Form.Group className="form-group">
          <Form.Label className="form-label">Name</Form.Label>
          <FormControl
            className="input"
            type="input"
            required
            name="name"
            placeholder="name"
            onChange={(e) => setData(e, "name")}
            value={values.name}
          />
          {error.name && (
            <FormLabel className="form-err">{error.name}</FormLabel>
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Mobile</Form.Label>
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
          {error.mob && <FormLabel className="form-err">{error.mob}</FormLabel>}
        </Form.Group>
        {/* <Form.Group>
          <Form.Label>Status</Form.Label>
          <FormControl
            type="string"
            name="status"
            placeholder="status"
            onChange={(e) => setData(e, "status")}
            value={values.status}
          />
        </Form.Group> */}
        <Form.Group className="form-group">
          <Form.Label className="form-label">Service</Form.Label>
          <FormControl
            className="input"
            type="string"
            required
            name="service"
            placeholder="service"
            onChange={(e) => setData(e, "service")}
            value={values.service}
          />
          {error.service && (
            <FormLabel className="form-err">{error.service}</FormLabel>
          )}
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">price</Form.Label>
          <FormControl
            className="input"
            type="Number"
            required
            name="price"
            placeholder="price"
            onChange={(e) => setData(e, "price")}
            value={values.price}
          />
          {error.price && (
            <FormLabel className="form-err">{error.price}</FormLabel>
          )}
        </Form.Group>
        <Form.Group className="form-group" style={{ margin: "2.8rem" }}>
          {/* <Form>submit</Form> */}
          <Button className="add-btn" onClick={() => submit()}>
            <i class="fas fa-plus" />
          </Button>
        </Form.Group>
      </Form>
      {/* for mount the update component file press edit button */}
      {mount && <WorkEdit pass={passData} />}
      {info && <WorkInfo pass={infoPass} />}
      <div className="tableContainer container mt-4">
        <Card className="totalAmount">
          <h5>Total Amount : ₹{totalAmount}</h5>
        </Card>

        <Table className="table" striped>
          <thead className="tableHead">
            <tr>
              <th>SlNo</th>
              <th>Date</th>
              <th>name</th>
              <th>Service</th>
              <th>Status</th>
              <th>Price</th>
              <th>Mobile</th>
              {/* <th>info</th>
              <th>Edit</th>
              <th>Del</th> */}
              <th>
                <FormControl
                  autoFocus
                  className="search"
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {work
              .filter(
                (data) =>
                  data.mob.includes(searchTerm) ||
                  data.date.includes(searchTerm) ||
                  data.name.includes(searchTerm) ||
                  // (data.index + 1).includes(searchTerm) ||
                  data.status.includes(searchTerm) ||
                  data.service.includes(searchTerm)
              )
              .map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {data.date.substring(0, 10)} <br />{" "}
                    {/* {data.date.substring(11, 16)} */}
                  </td>
                  <td>{data.name}</td>
                  <td>{data.service}</td>
                  <td>{data.status}</td>
                  <td>{data.price}</td>
                  <td>{data.mob}</td>
                  <td>
                    <Button
                      className="Control-btn info-button"
                      variant="info"
                      onClick={() => {
                        post("/data/sort", {
                          _id: data._id,
                        }).then((res) => {
                          // console.log(res.body.doc);
                          setInfoPass(res.body.doc[0]);
                          setModalShow(true);
                        });
                      }}
                    >
                      <i style={{ color: "white" }} class="fas fa-info"></i>
                    </Button>

                    <Button
                      className="Control-btn edit-btn"
                      onClick={() => {
                        post("/data/sort", {
                          _id: data._id,
                        }).then((res) => {
                          // console.log(res.body.doc);
                          setPassData(res.body.doc);
                          setmount(!mount);
                        });
                      }}
                    >
                      <i className="fas fa-pen" />
                    </Button>

                    <Button
                      className="Control-btn delete-btn"
                      variant="danger"
                      onClick={() => {
                        post("/data/delete", {
                          _id: data._id,
                        })
                          .then(() => {
                            window.location.reload(false);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      }}
                    >
                      <i className="fas fa-times" />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        pass={infoPass}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default Work;
