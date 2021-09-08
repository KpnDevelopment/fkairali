import React, { useEffect, useState } from "react";
import { post } from "../../utils/agent";
import { Line } from "react-chartjs-2";
import { Button, Form, FormControl } from "react-bootstrap";
function Chart() {
  const [data, setData] = useState([]);
  const [work, setWork] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchWrk();
  }, []);

  const options = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };
  let word;
  // handle searchTerm
  function handleChange(event) {
    setSearchTerm(event.target.value);
    console.log(searchTerm);
  }

  const fetchWrk = async () => {
    let amount = [];
    let service = [];
    let date = [];
    await post("/data/sort")
      .then((res) => {
        // console.log(response.body.doc);
        if (!res) {
          localStorage.clear();
          window.location.href = "/";
        }
        setWork(res.body.doc);
        console.log({ hey: res.body.doc });
        for (const dataObj of res.body.doc) {
          amount.push(parseInt(dataObj.price));
          service.push(dataObj.service);
        }
        console.log({ Amount: amount });
        console.log({ Date: date });

        service.sort((a, b) => a.localeCompare(b));
        setData({
          labels: service,
          datasets: [
            {
              label: "",
              data: amount,
              fill: false,
              backgroundColor: "rgb(0,0,255)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "# of No Votes",
              data: date,
              fill: false,
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgba(54, 162, 235, 0.2)",
              yAxisID: "y-axis-2",
            },
          ],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // console.log({ amount: amount });

  return (
    <div>
      <h1>Chart</h1>
      <Form>
        <Form.Group className="form-group">
          <Form.Label>Status</Form.Label>
          <Form.Control className="input" value="" as="select" name="status">
            {work.map((data, index) => (
              <option key={index} value={data.service} onChange={handleChange}>
                {data.service}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button>sort</Button>
      </Form>

      <div className="header">
        <h1 className="title">Line Chart</h1>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default Chart;
