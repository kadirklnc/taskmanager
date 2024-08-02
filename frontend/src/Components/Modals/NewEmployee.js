import React, { useState } from 'react';
import { Modal, Button, Form, ModalTitle } from 'react-bootstrap';

const NewEmployee = ({ show, handleClose }) => {
    const [showForm, setShowForm] = useState(false);
    const [employeeData, setEmployeeData] = useState({
        name: '',
        surname: '',
        phone: '',
        email: '',
        date: '',
        department: '',
        gender: '',
        is_active: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = () => {
        // Save employee data logic here
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <ModalTitle>Çalışan Oluştur</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Adı</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={employeeData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Soyadı</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            value={employeeData.surname}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefon No</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={employeeData.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-posta</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={employeeData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Doğum Tarihi</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={employeeData.date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Departman</Form.Label>
                        <Form.Control
                            type="text"
                            name="department"
                            value={employeeData.department}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cinsiyet</Form.Label>
                        <Form.Control
                            as="select"
                            name="gender"
                            value={employeeData.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Seciniz</option>
                            <option value="male">Erkek</option>
                            <option value="female">Kadın</option>
                            
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Aktif</Form.Label>
                        <Form.Control
                            as="select"
                            name="is_active"
                            value={employeeData.is_active}
                            onChange={handleChange}
                        >
                            <option value="1">Evet</option>
                            <option value="0">Hayır</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    İptal
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewEmployee;

