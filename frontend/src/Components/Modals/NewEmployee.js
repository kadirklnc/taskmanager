import React, { useState } from 'react';
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap';

const NewEmployee = ({ show, handleClose }) => {
    const [showForm, setShowForm] = useState(false);

    const handleOptionClick = () => {
        setShowForm(true);
    };
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <ModalTitle>Çalişan Oluştur</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUser">
                        <Form.Label>Ad</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group controlId="formType">
                        <Form.Label>Soyad</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>E-posta</Form.Label>
                        <Form.Control type="text"  />
                    </Form.Group>
                    <Form.Group controlId="formEndDate">
                        <Form.Label>Cep Telefonu</Form.Label>
                        <Form.Control type="text" />
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

export default NewEmployee;
