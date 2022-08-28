import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/A-logo.png";
import logoutIcon from "../../assets/logout.svg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

const NavbarMenu = () => {
  const { logoutUser } = useContext(AuthContext);
  const username = localStorage.getItem("appUserName");

  const logout = () => logoutUser();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const year = d.getFullYear();
  const month = monthArr[d.getMonth()];
  const day = weekday[d.getDay()];
  const date = d.getDate();
  const hours = d.getHours();
  // console.log(hours)
  let greeting = "";
  if (18 > hours > 12) {
    greeting = "Good Afternoon";
  } else if (hours > 18) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Morning";
  }
  const time = `${day}, ${month} ${date}, ${year}`;

  
  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <Nav.Link to="/dashboard" as={Link}>
          <img
            src={logo}
            alt="Logo"
            width="70"
            height="70"
            className="logo ms-4"
          />
          <span className="branch-name">Asalala</span>
          <br />
        </Nav.Link>
      </Navbar.Brand>

      <Nav className="time-greeting">
        <h6>{`${time} ${greeting}, ${username.toUpperCase()}`}</h6>
        
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="home-nav text-white" to="/dashboard" as={Link}>
            v1.0
          </Nav.Link>
        </Nav>

        <Nav>
          <Button
            variant="primary"
            className="font-weight-bolder text-white me-4"
            onClick={logout}
          >
            <img src={logoutIcon} alt="logoutIcon" width="32" height="32" />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
