import React from 'react'

import {
  Button,
  Modal
} from 'react-bootstrap'
import './style.css'

const ConfirmModal = ({
    message,
    show,
    onHide,
    title,
    language,
    getLang
}) => {
    const handleConfirm = () => {
      if(getLang === 'br') {
        language('br')
      }
      if(getLang === 'en') {
        language('en')
      }
      if(getLang === 'es') {
        language('es')
      }
      onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>{ message }</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmModal