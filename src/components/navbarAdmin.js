import React, { useContext } from "react";
import {Container, Dropdown, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "../assets/Icon.svg";
import profile from "../assets/photo-profile.png";
import topping from "../assets/topping.svg";
import product1 from "../assets/addproduct.svg";
import logoutImg from "../assets/logout.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function NavbarAdmin() {
  const profilToggle = (
    <Image src={profile} width="50" height="50" className=" rounded-circle" />
  );

  const product = <Image src={product1} width="15" height="15" />;

  const toppingIcon = <Image src={topping} width="15" height="15" />;

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
            <Link to="/admin">
              <img src={logo} style={{ Width: "60px" }} alt="logobrand" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Nav.Link className="align-item-center justify-content-center me-5 pe-5 fw-bolder text-danger">
              <NavDropdown title={profilToggle}>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/add-product"
                    className="text-decoration-none text-danger"
                  >
                    {product}
                    <span> Add Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="text-danger">
                  <Link
                    to="/list"
                    className="text-decoration-none text-danger"
                  >
                    {toppingIcon}
                    <span>List Product</span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">
                  {logoutIcon}
                  <span onClick={logout}> Logout</span>
                </Dropdown.Item>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </div>
  );
}