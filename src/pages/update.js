import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { API } from "../config/api";
import NavbarAdmin from "../components/navbarAdmin";

function UpdateProduct() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [preview, setPreview] = useState(null);
  const [nameUrl, setNameUrl] = useState();
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: "",
    image: "",
    desc: "",
    stock: "",
  });

  useEffect(() => {
    const findProduct = async () => {
      try {
        let response = await API.get("/product/" + id);
        setData(response.data.data);
        setAddProduct({
          title: response.data.data.title,
          price: response.data.data.price,
          desc: response.data.data.desc,
          stock: response.data.data.stock,
        });
        setPreview(response.data.data.image);
      } catch (e) {
      }
    };
    findProduct();
  }, [id]);

  const handleChange = (e) => {
    setAddProduct({
      ...addProduct,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
      setNameUrl(e.target.name[0]);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (addProduct.image) {
        formData.set("image", addProduct?.image[0], addProduct?.image[0]?.name);
      }
      formData.set("title", addProduct.title);
      formData.set("desc", addProduct.desc);
      formData.set("price", addProduct.price);
      formData.set("stock", addProduct.stock);
      await API.patch("/product/" + id, formData, config);

      navigate("/list");
    } catch (error) {
    }
  });

  return (
    <>
      <NavbarAdmin className="mb-5" />
      <Container fluid className="w-75 mt-5">
        <Row>
          <Col sm={7} className="px-5">
            <div className="text-start textname mb-5">
                <h1 className="fw-bold mt-2 pt-5">update</h1>
              </div>
            <Form
              onSubmit={(e) => handleSubmit.mutate(e)}
              className="text-center"
            >
              <Form.Control
                type="text"
                placeholder="Product Name"
                value={addProduct.title}
                name="title"
                onChange={handleChange}
                className="form-box button-log border-main mb-4"
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
                value={addProduct.stock}
                name="stock"
                onChange={handleChange}
                className="form-box button-log border-main mb-4"
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
                value={addProduct.price}
                name="price"
                onChange={handleChange}
                className="form-box button-log border-main mb-4"
                style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#613D2B",
                    backgroundColor: "#DCDCDC",
                  }}  
              />
              <textarea
                placeholder="Description Product"
                value={addProduct.desc}
                name="desc"
                onChange={handleChange}
                className="form-box button-log border-main mb-4"
                style={{
                    width: "100%",
                    borderRadius: "5px",
                    borderColor: "#613D2B",
                    backgroundColor: "#DCDCDC",
                        height: 200,
                        overflow: "auto",
                  }}  
              />
              <Form.Control
                type="file"
                name="image"
                onChange={handleChange}
                className="form-box button-log border-main mb-4"
                    style={{ border: "2px solid #613D2B", 
                    backgroundColor: "#DCDCDC",
                 }}
              />
             <Button
                className="btn button-main "
                style={{ width: "70%" }}
                type="submit"
              >
                Add Product
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={5} className="mt-5">
            {preview && (
              <div>
                <img
                  src={preview}
                  className="mt-5 pt-5"
                  style={{ 
                    width: "70%",
                    height: "80%", 
                    borderRadius: "10px" }}
                    alt={preview}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UpdateProduct;