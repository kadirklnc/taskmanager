import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const NewEmployee = ({ showModal, handleClose, currentEmployee, setEmployees, employees }) => {
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

    useEffect(() => {
        if (currentEmployee) {
            setEmployeeData({
                name: currentEmployee.name || '',
                surname: currentEmployee.surname || '',
                phone: currentEmployee.phone || '',
                email: currentEmployee.email || '',
                date: currentEmployee.date || '',
                department: currentEmployee.department || '',
                gender: currentEmployee.gender || '',
                is_active: currentEmployee.is_active || ''
            });
        } else {
            setEmployeeData({
                name: '',
                surname: '',
                phone: '',
                email: '',
                date: '',
                department: '',
                gender: '',
                is_active: ''
            });
        }
    }, [currentEmployee]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData(prevState => ({
            ...prevState,
            [name]: name === 'is_active' ? parseInt(value) : value
        }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }

            const data = { ...employeeData };
            let response;

            if (currentEmployee && currentEmployee.id) {
                response = await axios.put(`http://localhost:8080/api/admin/update/${currentEmployee.id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                response = await axios.post('http://localhost:8080/api/admin/add', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }

            if (response.status === 200 || response.status === 201) {
                const updatedEmployees = currentEmployee && currentEmployee.id
                    ? employees.map(employee => employee.id === currentEmployee.id ? response.data : employee)
                    : [...employees, response.data];
                setEmployees(updatedEmployees);
                handleClose();
            } else {
                console.error('Failed to save employee:', response);
            }
        } catch (error) {
            console.error('Error saving employee data:', error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{currentEmployee ? 'Çalışanı Düzenle' : 'Yeni Çalışan Oluştur'}</Modal.Title>
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
                            type="email"
                            name="email"
                            value={employeeData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Doğum Tarihi</Form.Label>
                        <Form.Control
                            type="text"
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
                            type="text"
                            name="gender"
                            value={employeeData.gender}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Aktif Durumu</Form.Label>
                        <Form.Control
                            as="select"
                            name="is_active"
                            value={employeeData.is_active}
                            onChange={handleChange}
                        >
                            <option value="">Seçiniz</option>
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
