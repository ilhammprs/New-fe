import React, { useState } from "react";
import { Container, Table } from "react-bootstrap";
import "../assets/styles.css";
import Trans from "../components/modal/trans";
import NavbarAdmin from "../components/navbarAdmin";
import { dataIncome } from '../components/fakedata';
import rp from "rupiah-format";

export default function IncomeTransaction() {
  const [transShow, setTransShow] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const handleTrans = (id) => {
    setOrderId(id);
    setTransShow(true);
  };
  const handleClose = () => setTransShow(false);
  return (
    <div>
        <NavbarAdmin />
        <Container className='mt-5 pt-5'>
            <div>
                <h1 className='text-start fw-semibold mb-4 mt-2'  style={{ color: "#613D2B" }}>Income Transaction</h1>
            </div>
            <Table>
                <thead style={{backgroundColor:"#613d2b45", border:"1px solid grey"}}>
                    <tr>
                        <th style={{border:"1px solid grey"}}>No</th>
                        <th style={{border:"1px solid grey"}}>Name</th>
                        <th style={{border:"1px solid grey"}}>Address</th>
                        <th style={{border:"1px solid grey"}}>Post Code</th>
                        <th style={{border:"1px solid grey"}}>Income</th>
                        <th style={{border:"1px solid grey"}}>Status</th>
                    </tr>
                </thead>
                <tbody className='triggered' style={{border:"1px solid grey"}}>
                        <Trans
                        transShow={transShow} Close={handleClose} 
                        />
                    {dataIncome.map((item, index) => (
                        <tr onClick={()=> handleTrans ()} key={index}>
                            <td>
                                {index + 1}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.name}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.address}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {item.postcode}
                            </td>
                            <td style={{border:"1px solid grey"}}>
                                {rp.convert(item.income)}
                            </td>
                            <td className={item.status} style={{border:"1px solid grey"}}>
                                {item.status === "success" ? "Success" : item.status === "ontheway" ? "On The Way" : item.status === "waiting" ? "Waiting Approve" : item.status === "canceled" ? "Canceled": ""}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
  )
}