// src/components/RequestModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap';

const RequestModal = ({ show, handleClose }) => {
  const [showForm, setShowForm] = useState(false);
  const handleOptionClick = () => {
    setShowForm(true);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <ModalTitle>İzin Talebi</ModalTitle>
      </Modal.Header>
      <Modal.Body>

        <Form>
          <Form.Group controlId="formUser">
            <Form.Label>İzin Kullanan Kişi</Form.Label>
            <Form.Control type="text" placeholder="İzin Kullanan Kişi" />
          </Form.Group>
          <Form.Group controlId="formType">
            <Form.Label>İzin Türü</Form.Label>
            <Form.Control type="text" placeholder="İzin Türü" />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Başlangıç Zamanı</Form.Label>
            <Form.Control type="date" placeholder="Başlangıç Zamanı" />
          </Form.Group>
          <Form.Group controlId="formEndDate">
            <Form.Label>Bitiş Zamanı</Form.Label>
            <Form.Control type="date" placeholder="Bitiş Zamanı" />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Açıklama" />
          </Form.Group>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleClose}>
          İzin Talebi Oluştur
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RequestModal;
