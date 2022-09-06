import React, { useContext, useState } from "react";
import { Container, Dropdown, Image, Nav, Navbar, NavDropdown, NavLink } from "react-bootstrap";
import logo from "../assets/Icon.svg";
import profile from "../assets/photo-profile.png";
import cart from "../assets/cart.svg";
import profile1 from "../assets/icon-profile.svg";
import logoutImg from "../assets/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function NavbarLogin({show}) {
  const profilToggle = (
    <Image src={profile} width="50" height="50" className=" rounded-circle" />
  );

  const profileVector = <Image src={profile1} width="15" height="15" />;

  const logoutIcon = <Image src={logoutImg} width="15" height="15" />;

  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between border-bottom shadow">
          <Navbar.Brand className="ms-3 ps-5">
            <Link to="/">
              <img src={logo} style={{ Width: "70px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="me-3 mt-2 text-danger">
              <Link to="/cart" className="text-decoration-none">
                <div className="cart">
                  <img src={cart} alt="" style={{ maxWidth: "40px" }} />
                  <span className="notif" style={{backgroundColor:"red"}}>{show}</span>
                </div>
              </Link>
            </Nav.Link>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-danger">
              <NavDropdown title={profilToggle}>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/profile"
                    className="text-danger text-decoration-none"
                  >
                    {profileVector}
                    <span> Profile</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  {logoutIcon}
                  <span  onClick={logout}> Logout</span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
}