// src/components/NewDepartmentModal.js
import React from 'react';
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap';

const NewDepartment = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <ModalTitle>Yeni Departman Oluştur</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDepartmentName">
            <Form.Label>Departman Adı</Form.Label>
            <Form.Control type="text" placeholder="Departman Adı" />
          </Form.Group>
          <Form.Group controlId="formDepartmentDescription">
            <Form.Label>Açıklama</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Açıklama" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleClose}>
          Departman Oluştur
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewDepartment;
