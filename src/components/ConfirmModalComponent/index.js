import React from 'react'
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('common')

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
        <Modal.Body>
          <div className="message">{ message }</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleConfirm}>
            {t('modal.confirm')}
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ConfirmModal