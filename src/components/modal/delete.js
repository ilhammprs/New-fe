import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function DeleteModal(props) {
  return (
    <Modal show={props.listDel} onHide={props.Close}>
        <Modal.Body>Are you sure want to delete this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.Close}>
            Cancel
          </Button>
          <Button variant="danger" onClick={props.Close}>
            Accept Delete
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
