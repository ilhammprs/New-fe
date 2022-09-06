import React, { useContext, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/Icon.svg";
import AuthModal from "./modal/Auth";

export default function NavbarUser() {
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between border-bottom shadow">
          <Navbar.Brand className="ms-3 ps-5">
            <img src={logo} style={{ Width: "70px" }} alt="logobrand" />
          </Navbar.Brand>
          <AuthModal />
        </Navbar>
      </Container>
    </div>
  );
}
