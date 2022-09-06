import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import paperclip from "../assets/paperclip.png";
import NavbarAdmin from "../components/navbarAdmin";
import ProductAdd from "../components/modal/product";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    desc: "",
    image: "",
  });

  const [viewLabel, setViewLabel] = useState(null);
  const [labelName, setLabelName] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setViewLabel(url);
      setLabelName(e.target.files[0].name);
    }
  };

  let navigate = useNavigate();

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("title", form.title);
      formData.set("stock", form.stock);
      formData.set("price", form.price);
      formData.set("desc", form.desc);

      const response = await API.post("/product", formData, config);

      navigate("/list");
    } catch (error) {
    }
  });

  const handleCloseAp = () => setAddProduct(false);

  return (
    <div>
      <NavbarAdmin />
      <Container className="mt-5 pt-5">
        <Row>
          <Col xs={12} md={7}>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="text-start textname mb-5">
                <h1 className="fw-bold mt-2 pt-5">Product</h1>
              </div>
              <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Name"
                    className="form-box button-log border-main mb-4"
                    onChange={handleChange}
                    name="title"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      borderColor: "#613D2B",
                      backgroundColor: "#DCDCDC",
                    }}  
                />
                <Form.Control
                    type="text"
                    placeholder="Stock"
                    name="stock"
                    className="form-box button-log border-main mb-4"
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      borderColor: "#613D2B",
                      backgroundColor: "#DCDCDC",
                    }} 
                />
                <Form.Control
                   type="text"
                   placeholder="Price"
                   name="price"
                   className="form-box button-log border-main mb-4"
                   onChange={handleChange}
                   style={{
                      width: "100%",
                      borderRadius: "5px",
                      borderColor: "#613D2B",
                      backgroundColor: "#DCDCDC",
                  }}  
                />
                <Form.Control
                  placeholder="Description Product"
                  className="form-box button-log border-main mb-4"
                  onChange={handleChange}
                  name="desc"
                  style={{
                    borderRadius: "5px",
                    borderColor: "#613D2B",
                    backgroundColor: "#DCDCDC",
                      width: "100%",
                      height: 200,
                      overflow: "auto",
                  }}  
                />
                <div
                  className="button-log border-main mb-4"
                  style={{ borderRadius: "5px" }}
                >
                  <input
                   type="file"
                   className="form-control"
                   name="image"
                   id="inputgroupfile2"
                   onChange={handleChange}
                   hidden
                   required
                      style={{ border: "2px solid #613D2B", 
                      backgroundColor: "#DCDCDC",
                    }}
                  />
                  <label
                    className="d-flex jc-between ai-center input-group-text form-box"
                    htmlFor="inputgroupfile2"
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      borderColor: "#613D2B",
                      backgroundColor: "#DCDCDC",
                    }}  
                  >
                      {" "}
                    {labelName === "" ? "Add Image" : labelName}{" "}
                    <img src={paperclip} alt="" className="" />
                  </label>
                </div>
              </Form.Group>
              <Button
                className="btn button-main "
                style={{ width: "70%" }}
                type="submit"
              >
                Add Product
              </Button>
              <ProductAdd addProduct={addProduct} Close={handleCloseAp} />
            </Form>
          </Col>
          <Col xs={12} md={5} className="mt-5">
            {viewLabel && (
              <img
                src={viewLabel}
                className="mt-5 pt-5"
                style={{ height: "80%", borderRadius: "10px" }}
                alt="view"
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddProduct;
