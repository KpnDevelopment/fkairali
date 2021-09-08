import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { post } from "../../utils/agent";
import "./navigation.css";
import Logo from "../../logo.png";

function Navigation() {
  useEffect(() => {
    fetchUser();
  }, []);
  let userId = localStorage.getItem("user");
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    post("/user/", {
      _id: userId,
    }).then((response) => {
      if (!response) {
        localStorage.clear();
        window.location.href = "/";
      }
      setUser(response.body.doc[0]);
    });
  };
  const logout = () => {
    // window.localStorage.removeItem("auth-key");
    window.localStorage.removeItem("auth-key");
    // window.localStorage.clear();
    window.location.reload(false);
  };
  const history = useHistory();

  const handleLogout = () => {
    history.push("/login");
  };

  return (
    <div className="container">
      <Navbar
        className="navigation m-1 navbar-expand-lg "
        fixed="top"
        bg="primary"
        variant="dark"
        style={{ zIndex: "999", borderRadius: "15px" }}
      >
        <div className="container">
          <img className="brand-logo-nav" src={Logo} alt="" />

          <Navbar.Brand className="brand m-2">Accounter</Navbar.Brand>
          <div className="container">
            <Nav className="mr-auto">
              <Link className="link" to="/chart">
                <li className="li-list">Home</li>
              </Link>
            </Nav>
          </div>

          <Nav className="drop-down-user">
            <Dropdown
              size="sm"
              as={ButtonGroup}
              style={{ borderRadius: "30%" }}
            >
              <i
                style={{ color: "white", padding: "10px" }}
                class="fas fa-user"
              ></i>
              <Dropdown.Toggle
                style={{ background: "white" }}
                variant="light"
                id="dropdown-split-basic"
              />

              <Dropdown.Menu
                className="drop-menu"
                style={{ textTransform: "capitalize" }}
              >
                <div className="drop-menu-icon">
                  <div className="icon">
                    <i
                      style={{ color: "white ", padding: "10px" }}
                      class="fas fa-user"
                    ></i>
                  </div>
                </div>
                <Dropdown.Item className="drop-item" href="#/action-1">
                  {user.name}
                  <span style={{ textTransform: "lowercase" }}>
                    {"  " + "(" + user.email + ")"}
                  </span>
                </Dropdown.Item>
                <Dropdown.Item
                  className="drop-item"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </Dropdown.Item>
                {/* <Dropdown.Item className="drop-item" href="#/action-3">
                Something else
              </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
}

export default Navigation;
