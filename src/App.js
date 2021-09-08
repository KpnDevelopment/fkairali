import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import components
import Work from "./componets/works/Work";
import Login from "./componets/login/Login";
import Sign from "./componets/login/Sign";
import Navigation from "./componets/nav/Navigation";
import Chart from "./componets/Charts/Chart";

function App() {
  const token = localStorage.getItem("auth-key");

  if (!token) {
    // return <Login />;
    return (
      <div className="maintain">
        <Router>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route exact path="/sign" component={Sign}></Route>
          </Switch>
        </Router>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Work} />
          <Route path="/chart" exact component={Chart} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
