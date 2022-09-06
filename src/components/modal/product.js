import React from 'react'
import { Modal } from 'react-bootstrap'

export default function ProductAdd(props) {
  return (
    <Modal show={props.addProduct} onHide={props.Close} {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
        <Modal.Body>
            <p className='text-center fw-semibold fs-4 px-5 py-3' style={{color:"darkgreen"}}>New Product Has Been Added to List</p>
            </Modal.Body>
      </Modal>
  )
}
