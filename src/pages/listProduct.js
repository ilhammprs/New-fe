import { Container, Button } from "react-bootstrap"
import Navbar from '../components/navbarAdmin';
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { useQuery } from "react-query";
import rp from "rupiah-format";
import { API } from "../config/api";

function ListProduct() {
    let navigate = useNavigate();
    const [showTransaction, setShowTransaction] = useState(false)
    const handleShow = () => setShowTransaction(true)
    const handleClose = () => setShowTransaction(false)

    const handleEdit = (id) => {
        navigate("/edit-product/" + id);
      };
      let handleDelete = async (id) => {
        await API.delete(`/product/` + id);
        refetch();
        handleShow();
      };

    let { data: products, refetch} = useQuery("productsCache", async () => {
        const response = await API.get("/products");
        return response.data.data;
      });

    return(
        <Container>
            <Navbar/>
            <div className="mt-5 px-5 pt-5">
                <h3 className="colorPrimary mb-4 mt-4 fw-bold">List Product</h3>
                <Table hover>
                    <thead style={{backgroundColor:"#613d2b45", border:"1px solid grey"}}>
                        <tr>
                            <th style={{border:"1px solid grey"}}>No</th>
                            <th style={{border:"1px solid grey"}}>Image</th>
                            <th style={{border:"1px solid grey"}}>Name</th>
                            <th style={{border:"1px solid grey"}}>Stock</th>
                            <th style={{border:"1px solid grey"}}>Price</th>
                            <th style={{border:"1px solid grey"}}>Description</th>
                            <th style={{border:"1px solid grey"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((item,index) => (
                            <tr key={index} onClick={handleShow}>
                            <td style={{border:"1px solid grey"}}>{item.id}</td>
                            <td style={{border:"1px solid grey"}}><img src={item.image} width={'100rem'} /></td>
                            <td style={{border:"1px solid grey"}}>{item.title}</td>
                            <td style={{border:"1px solid grey"}}>{item.stock}</td>
                            <td className="tdPrice" style={{border:"1px solid grey"}}>{rp.convert(item.price)}</td>
                            <td style={{border:"1px solid grey"}}>{item.desc}</td>
                            <td className="text-center" style={{border:"1px solid grey"}}>
                                <Button variant="danger" className="me-1"  onClick={() => {handleDelete(item.id);}}>Delete</Button>
                                <Button variant="success" className="ms-1" onClick={() => {handleEdit(item.id);}}>Update</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

export default ListProduct