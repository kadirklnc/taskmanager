import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EmployeeFormModal = ({ showModal, handleClose, handleChange, handleSave, currentEmployee }) => (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                {currentEmployee && currentEmployee.id ? 'Çalışan Düzenle' : 'Yeni Çalışan Oluştur'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                {currentEmployee && (
                    <>
                        <Form.Group controlId="formName">
                            <Form.Label>Adı</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={currentEmployee.name || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formSurname">
                            <Form.Label>Soyadı</Form.Label>
                            <Form.Control
                                type="text"
                                name="surname"
                                value={currentEmployee.surname || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Telefon No</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={currentEmployee.phone || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>E-posta</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={currentEmployee.email || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Şifre</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={currentEmployee.password || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Doğum Tarihi</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={currentEmployee.date || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDepartment">
                            <Form.Label>Departman</Form.Label>
                            <Form.Control
                                type="text"
                                name="department"
                                value={currentEmployee.department || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formGender">
                            <Form.Label>Cinsiyet</Form.Label>
                            <Form.Control
                                as="select"
                                name="gender"
                                value={currentEmployee.gender || ''}
                                onChange={handleChange}
                            >

                                <option value="Erkek">Erkek</option>
                                <option value="Kadin">Kadın</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formIsActive">
                            <Form.Label>Aktif Durumu</Form.Label>
                            <Form.Control
                                as="select"
                                name="is_active"
                                value={currentEmployee.is_active ? '1' : '0'}
                                onChange={handleChange}
                            >
                                <option value="1">Evet</option>
                                <option value="0">Hayır</option>
                            </Form.Control>
                        </Form.Group>
                    </>
                )}
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

export default EmployeeFormModal;
