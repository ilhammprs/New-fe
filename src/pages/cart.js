import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import DeleteModal from "../components/modal/delete";
import trash from "../assets/trash2.svg";
import PaymentModal from "../components/modal/payment";
import { UserContext } from "../context/userContext";
import NavbarLogin from "../components/navbarUser";
import { useNavigate } from "react-router-dom";
import rp from "rupiah-format";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

export default function Cart() {
  const [payShow, setPayShow] = useState(false);
  const handlePay = () => setPayShow(true);
  const handleClose = () => setPayShow(false);

  const [listDel, setListDel] = useState(false);
  const handleDel = () => setListDel(true);
  const handleCloseDel = () => setListDel(false);

  const [state, dispatch] = useContext(UserContext);
  const [addCart, setAddChart] = useState(0);

  let navigate = useNavigate();

  let { data: cart, refetch } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts-id");
    return response.data.data;
  });

  //total
  let Total = cart?.reduce((a, b) => {
    return a + b.subtotal;
  }, 0);

  //hapus
  let handleDelete = async (id) => {
    await API.delete(`/cart/` + id);
    refetch();
  };

  //pay
  const form = {
    status: "success",
    total: Total,
  };
  const handleSubmit = useMutation(async (e) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
const body = JSON.stringify(form);

    const response = await API.patch("/transaction", body, config);

    const token = response.data.token;

    window.snap.pay(token, {
      onSuccess: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onPending: function (result) {
        /* You may add your own implementation here */
        console.log(result);
        navigate("/profile");
      },
      onError: function (result) {
        /* You may add your own implementation here */
        console.log(result);
      },
      onClose: function () {
        /* You may add your own implementation here */
        alert("you closed the popup without finishing the payment");
      },
    });
  });

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div>
      <NavbarLogin show={addCart} />
      <Container className="mt-5">
        <Row>
          <Col xs={12} md={7} className="mt-5 py-5 px-4" style={{}}>
            <div className="text-danger text-start">
              <h3 className="  fw-bold">My Cart</h3>
              <p>Review your order</p>
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderTop: "2px solid red",
                borderBottom: "2px solid red",
              }}
            >
              <Row className="p-3">
                {cart?.map((item, index) => (
                  <>
                    <Col xs={12} md={2} style={{}}>
                      <img
                        src={item?.product?.image}
                        alt="cartImage"
                        style={{ width: "100%", borderRadius: "8px" }}
                      />
                    </Col>
                    <Col xs={12} md={6} style={{}}>
                      <ul className="description justify-content-start align-items-center pt-4 ps-0 mb-0">
                        <li>
                          <p className="text-danger fw-bold">
                            {item?.product?.title}
                          </p>
                        </li>
                      </ul>
                    </Col>
                    <Col xs={12} md={4} style={{}}>
                      <ul className="description text-end align-items-center pt-4 pr-3 ps-0 mb-0">
                        <li>
                          <p className="text-danger fw-semibold">
                             {rp.convert(item?.subtotal)}
                          </p>
                        </li>
                        <li>
                          <i
                            className="trash-btn"
                            onClick={() => handleDelete(item.id)}
                          >
                            <img src={trash}/>
                          </i>
                        </li>
                        <DeleteModal listDel={listDel} Close={handleCloseDel} />
                      </ul>
                    </Col>
                  </>
                ))}
              </Row>
            </div>
          </Col>
          <Col xs={12} md={5} className="mt-5 p-5">
            <div className="text-white">
              <h3 className="  fw-bold">My Cart</h3>
              <p>Review yor order</p>
            </div>
            <div
              className="p-2"
              style={{
                borderTop: "2px solid red",
                borderBottom: "2px solid red",
                width: "80%",
              }}
            >
              <div className="d-flex justify-content-between">
                <p className="text-danger">Subtotal</p>
                <p>{rp.convert(Total)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="text-danger">Qty</p>
                <p className="text-danger">{cart?.length}</p>
              </div>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{ width: "80%" }}
            >
              <p className="text-danger fw-bold">Total</p>
              <p>{rp.convert(Total)}</p>
            </div>
            <div className="mt-5" style={{ width: "80%" }}>
              <Button
                type="submit"
                onClick={(e) => handleSubmit.mutate(e)}
                className="btn btn-danger fw-bold px-5"
                style={{ width: "100%" }}
              >
                Pay
              </Button>
              <PaymentModal payShow={payShow} Close={handleClose} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}