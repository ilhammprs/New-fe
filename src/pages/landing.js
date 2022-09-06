import React, { useContext, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import background from "../assets/bg1.svg";
import NavbarUser from "../components/navbar";
import NavbarLogin from "../components/navbarUser";
import { UserContext } from "../context/userContext";
import rp from "rupiah-format";
import { useQuery } from "react-query";
import { API } from "../config/api";

function Landing() {
  const [state, dispatch] = useContext(UserContext);
  const [addCart, setAddChart] = useState(0);

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  return (
    <div>
    {state.isLogin===false?  <NavbarUser/>: <NavbarLogin show={addCart}/> }
      <Container className='my-5 pt-5'>
      <Card className=" my-2 pt-5 top d-flex bg-white justify-content-between" style={{border:"none"}}>
        <Card.Img src={background}/>
      </Card>
      </Container>
  <Container>
  <Row className="gap-1">
      {products?.map((item, index) => (
      <Col className="mb-3 " key={index}>
          <Link to={state.isLogin === true ?`/product/${item.id}`:""} className="text-decoration-none">
          <Card
            key={index}
            className="rounded-3 bgCard text-decoration-none"
            style={{ width: "18rem" }}
          >
            <Card.Img src={item.image} />
            <Card.Body>
              <Card.Title className="text-danger text-decoration-none">
                <b>{item.title}</b>
              </Card.Title>
              <Card.Text>
               <div className="text-danger text-decoration-none"> {rp.convert(item.price)}</div>
               <div className="text-danger text-decoration-none"> Stock : {item.stock}</div>
              </Card.Text>  
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ))}
  </Row>
</Container>
  </div>
);
}

export default Landing;
