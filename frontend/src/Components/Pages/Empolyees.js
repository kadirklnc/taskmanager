import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Employees.css';
import SearchBar from '../Common/SearchBar';

const Employee = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        {
            name: 'Izmir',
            surname: 'Vucaj',
            phone: '5058347165',
            date: '21.11.2001',
            department: 'developer',
            is_active: '1',
        },
        {
            name: 'Kadir',
            surname: 'Kilinc',
            phone: '5058347165',
            date: '21.11.2001',
            department: 'developer',
            is_active: '1',
        },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);

    const handleSearch = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    const filteredEmployees = employees.filter(employee =>
        Object.values(employee).some(value =>
            value.toString().toLowerCase().includes(searchTerm)
        )
    );

    const handleSelectEmployee = (name) => {
        const selectedEmployee = employees.find(emp => emp.name === name);
        setCurrentEmployee({ ...selectedEmployee });
    };

    const handleSave = () => {
        setEmployees(employees.map(emp => (emp.name === currentEmployee.name ? currentEmployee : emp)));
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentEmployee({ ...currentEmployee, [name]: value });
    };

    return (
        <div className="employee-list-container">
            <div className="employee-list-header">
                <h3>Çalışanlar ({filteredEmployees.length})</h3>
                <div className="employee-list-actions">
                    <Button variant="outline-success">İçe Aktar</Button>
                    <Button variant="success">+ Yeni Çalışan Oluştur</Button>
                </div>
            </div>
            <SearchBar onSearch={handleSearch} placeholder="Çalışan Ara" />
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Adı Soyadı</th>
                            <th>Telefon No</th>
                            <th>Doğum Tarihi</th>
                            <th>Departman</th>
                            <th>Aktif</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.name} {employee.surname}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.date}</td>
                                <td>{employee.department}</td>
                                <td>{employee.is_active === '1' ? 'Evet' : 'Hayır'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Button variant="success" onClick={() => setShowModal(true)}>
                Düzenle
            </Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Çalışan Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control
                                as="select"
                                onChange={(e) => handleSelectEmployee(e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>Çalışan Seç</option>
                                {employees.map((employee, index) => (
                                    <option key={index} value={employee.name}>
                                        {employee.name} {employee.surname}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {currentEmployee && (
                            <>
                                <Form.Group>
                                    <Form.Label>Adı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={currentEmployee.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Soyadı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="surname"
                                        value={currentEmployee.surname}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Telefon No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={currentEmployee.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Doğum Tarihi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="date"
                                        value={currentEmployee.date}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Departman</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={currentEmployee.department}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Aktif</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="is_active"
                                        value={currentEmployee.is_active}
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
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Kapat
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Employee;
