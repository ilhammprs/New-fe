import React, { useContext, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavbarLogin from "../components/navbarUser";
import { useNavigate, useParams } from "react-router-dom";
import rp from "rupiah-format";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

function Detail() {
  const navigate = useNavigate();

  let { id } = useParams();
  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data;
  });

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "applicaton/json",
        },
      };
      const body = JSON.stringify({
        subtotal: product.price,
        product_id: product.id,
        qty: 1,
      });
      const response = await API.post("/cart", body, config);

      navigate("/cart");
    } catch (error) {
    }
  });

  return (
    <div>
      <NavbarLogin />
      <Container className="mt-4 pt-5">
        <Row>
          <Col xs={12} md={5}>
            <img
              src={product?.image}
              style={{ width: "80%" }}
              className='mt-5 pt-5'
              alt="transaction"
            />
          </Col>
          <Col xs={12} md={7}>
            <div className='mt-5 pt-5'>
                 <h1 className='mb-3 text-start fw-bold textname'>{product?.title}</h1>
                 <p className='text-start fw-bold textname' style={{fontSize:"17px"}}>Stock : {(product?.stock)}</p>
                 <p className='detaildesc mb-5' style={{fontSize:"25px"}}>{product?.desc}</p>
            </div>
            <div className="mb-5 mt-3">
            </div>
            <div className="d-flex justify-content-between">
              <h2 className="mb-2 detailprice">Total</h2>
              <h2 className="mb-2 detailprice">
                {rp.convert(product?.price)}{" "}
              </h2>
            </div>
            <div>
              <Button
                className="mt-4 lgbutton brownbutton" style={{width:'80%'}}
                onClick={(e) => handleSubmit.mutate(e)}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Detail;
