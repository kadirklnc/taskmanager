import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Employees.css';
import SearchBar from '../Common/SearchBar';

const Employee = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        {
            name: 'Izmir Vucaj',
            position: 'Yönetim',
            department: 'Yönetim',
            email: 'izmirvucaj12@gmail.com',
            phone: '5058347165',
            startDate: '17 Temmuz 2024',
            idcard: 'Izmir Vucaj',
            birthDate: '1 Kişi',
            gender: 'İstanbul',
            registrationNumber: '213456',
            country: 'turkiye',
            province: 'edirne',
            district: 'merkez',
            address: 'edirne',
        },
        {
            name: 'Zehra Gizem',
            position: 'Yönetim',
            department: 'Yönetim',
            startDate: '17 Temmuz 2024',
            idcard: 'Izmir Vucaj',
            birthDate: '1 Kişi',
            gender: 'İstanbul',
            registrationNumber: '213456',
            email: 'z12@gmail.com',
            phone: '5058347121',
            country: 'turkiye',
            province: 'edirne',
            district: 'merkez',
            address: 'edirne',
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

    const handleSelectEmployee = (email) => {
        const selectedEmployee = employees.find(emp => emp.email === email);
        setCurrentEmployee({ ...selectedEmployee });
    };

    const handleSave = () => {
        setEmployees(employees.map(emp => (emp.email === currentEmployee.email ? currentEmployee : emp)));
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
                            <th>Departman</th>
                            <th>E-Posta</th>
                            <th>Telefon No</th>
                            <th>Şirkete Giriş Tarihi</th>
                            <th>Pozisyon</th>
                            <th>Kimlik Kartı</th>
                            <th>Doğum Tarihi</th>
                            <th>Cinsiyet</th>
                            <th>Kayıt Numarası</th>
                            <th>Ülke</th>
                            <th>İl</th>
                            <th>İlçe</th>
                            <th>Adres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.name}</td>
                                <td>{employee.department}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.startDate}</td>
                                <td>{employee.position}</td>
                                <td>{employee.idcard}</td>
                                <td>{employee.birthDate}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.registrationNumber}</td>
                                <td>{employee.country}</td>
                                <td>{employee.province}</td>
                                <td>{employee.district}</td>
                                <td>{employee.address}</td>
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
                                    <option key={index} value={employee.email}>
                                        {employee.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {currentEmployee && (
                            <>
                                <Form.Group>
                                    <Form.Label>Adı Soyadı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={currentEmployee.name}
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
                                    <Form.Label>E-Posta</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={currentEmployee.email}
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
                                    <Form.Label>Şirkete Giriş Tarihi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="startDate"
                                        value={currentEmployee.startDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Pozisyon</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="position"
                                        value={currentEmployee.position}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Kimlik Kartı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="idcard"
                                        value={currentEmployee.idcard}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Doğum Tarihi</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="birthDate"
                                        value={currentEmployee.birthDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Cinsiyet</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="gender"
                                        value={currentEmployee.gender}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Kayıt Numarası</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="registrationNumber"
                                        value={currentEmployee.registrationNumber}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ülke</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="country"
                                        value={currentEmployee.country}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>İl</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="province"
                                        value={currentEmployee.province}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>İlçe</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="district"
                                        value={currentEmployee.district}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={currentEmployee.address}
                                        onChange={handleChange}
                                    />
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
