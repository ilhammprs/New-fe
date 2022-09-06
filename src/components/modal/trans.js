import React from 'react'
import {Modal, Col, Row} from 'react-bootstrap'
import iceblend from '../../assets/ice-blend.png'
import logo from '../../assets/logo.svg'
import barcode from '../../assets/barcode.png'

export default function TransModal({transShow, Close, id}) {
    console.log(id);
    return (
    <Modal show={transShow} onHide={Close}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Body style={{backgroundColor:"#F6DADA", width:"100%", borderRadius:"6px"}}>
            <Row>
            <Col xs={12}>
                    <div>
                        <h4 className='text-start fw-bold fs-4 mb-3' style={{color:"#613D2B"}}>My Transaction</h4>
                    </div>
                    <Row className="p-3" style={{backgroundColor:"#F6DADA", borderRadius:"5px"}}>
                        <Col xs={12} md={8}>
                            <Row className="pt-2">
                                {/* {income.map((value)=>( */}
                                    <div className="d-flex mb-2">
                                    <img
                                    src=''
                                    style={{width:"25%", borderRadius:"8px"}}
                                    className=''
                                    alt=''
                                    />
                                    <ul className="text-start">
                                        <li style={{listStyle:"none", fontSize:"8px"}}><h4 className='text-danger fw-bold'>test</h4></li>
                                        <li style={{listStyle:"none", fontSize:"14px"}}><p className='text-danger fw-normal'><span className='fw-bold'>Saturday,</span> 5 march 2020</p></li>
                                        <li style={{listStyle:"none", fontSize:"14px", marginBottom:"-10px"}}><p className='text-danger fw-semibold'> <span className="fw-bold" style={{color:"#613D2B"}}>Topping :</span></p></li>
                                        <li style={{listStyle:"none", fontSize:"14px"}}> <p className="fw-normal" style={{color:"#613D2B"}}>Price : Rp. <span></span></p></li>
                                    </ul>
                                </div>
                            </Row>
                        </Col>
                        <Col xs={12} md={4} >
                            <div className='mb-3'>
                                <img
                                src={logo}
                                style={{width:"30%"}}
                                className=''
                                alt=''
                                />
                            </div>
                            <div>
                                <img
                                src={barcode}
                                style={{width:"40%"}}
                                className='mb-3'
                                alt=''
                                />
                            </div>
                            <div className='d-flex justify-content-center mb-3' style={{backgroundColor:'rgb(255,175,25, 0.5)', borderRadius:"8px"}}>
                                <p className='text-align-center fw-semibold' style={{color:"#FF9900"}}>Waiting Approve</p>
                            </div>
                            <div className=''>
                                <p className='fw-bold' style={{color:"#974A4A"}}>Sub total : Rp. <span style={{color:"#974A4A"}}>27.000</span></p>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal.Body>
        </Modal>
  )
}
