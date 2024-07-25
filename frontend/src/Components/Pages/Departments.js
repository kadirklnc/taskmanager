import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Departments.css'; // Import the new CSS file
import SearchBar from '../Common/SearchBar';

const Departmans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const departments = [
    {
      name: 'Yönetim',
      position: 'Manager',
      department: 'Izmir Vucaj',
      email: '1 kiși',
    },
    // Add more department data here
  ];

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm) ||
    department.position.toLowerCase().includes(searchTerm) ||
    department.department.toLowerCase().includes(searchTerm) ||
    department.email.toLowerCase().includes(searchTerm) ||
    department.phone.includes(searchTerm) ||
    department.startDate.toLowerCase().includes(searchTerm) ||
    department.reportsTo.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="department-list-container">
      <div className="department-list-header">
        <h3>Departmanlar ({filteredDepartments.length})</h3>
        <div className="department-list-actions">
          <Button variant="outline-success">İçe Aktar</Button>
          <Button variant="success">+ Yeni Departman Oluştur</Button>
        </div>
      </div>
      <SearchBar onSearch={handleSearch} placeholder="Departman Ara" />
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Departman Adı</th>
            <th>Bağlı Olduğu Departman</th>
            <th>Departman Yöneticisi</th>
            <th>Çalışanlar</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department, index) => (
            <tr key={index}>
              <td>{department.name}</td>
              <td>{department.position}</td>
              <td>{department.department}</td>
              <td>{department.email}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Departmans;
