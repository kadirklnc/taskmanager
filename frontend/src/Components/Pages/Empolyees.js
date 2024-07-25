import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Employees.css';
import SearchBar from '../Common/SearchBar';

const Employee = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const employees = [
        {
            name: 'Izmir Vucaj',
            position: 'Yönetim',
            department: 'Yönetim',
            email: 'izmirvucaj12@gmail.com',
            phone: '5058347165',
            startDate: '17 Temmuz 2024',
            reportsTo: 'Izmir Vucaj'
        },
        {
            name: 'Zehra Gizem',
            position: 'Yönetim',
            department: 'Yönetim',
            email: 'z12@gmail.com',
            phone: '5058347121',
            startDate: '17 Temmuz 2024',
            reportsTo: 'Zehra Gizem',
        },
    ];

    const handleSearch = (query) => {
        setSearchTerm(query.toLowerCase());
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm) ||
        employee.position.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm) ||
        employee.phone.includes(searchTerm) ||
        employee.startDate.toLowerCase().includes(searchTerm) ||
        employee.reportsTo.toLowerCase().includes(searchTerm)
    );

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
            <Table responsive bordered>
                <thead>
                    <tr>
                        <th>Adı Soyadı</th>
                        <th>Unvanı</th>
                        <th>Departman</th>
                        <th>E-Posta</th>
                        <th>İş Telefonu</th>
                        <th>Şirkete Giriş Tarihi</th>
                        <th>Raporladığı Kiși</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={index}>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                            <td>{employee.department}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.startDate}</td>
                            <td>{employee.reportsTo}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Employee;
