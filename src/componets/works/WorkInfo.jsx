import React from "react";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import "./work.css";

function WorkInfo(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log(props.pass[0]);
    setData(props.pass[0]);
  }, []);
  return (
    <div className="container work-info">
      <Card className="card" border="primary">
        <h2 className="card-user">{data.name}</h2>

        <Card.Body className="card-body">
          <div className="div1">
            <Card.Text className="card-text"> {data.mob}</Card.Text>
            <Card.Text className="card-text"> {data.status}</Card.Text>
            <Card.Text className="card-text"> {data.service}</Card.Text>
          </div>
          <div className="div2">
            <Card.Text className="card-text"> {"₹" + data.price}</Card.Text>
            <Card.Text className="card-text">{data.updatedDate}</Card.Text>
            <Card.Text className="card-text">{data.updatedTime}</Card.Text>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default WorkInfo;
