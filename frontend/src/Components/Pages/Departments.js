import React, { useState, useEffect, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Departments.css';
import SearchBar from '../Common/SearchBar';
import { FaCaretDown } from 'react-icons/fa';
import NewDepartment from '../Modals/NewDepartment';

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [expandedDepartment, setExpandedDepartment] = useState(null);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/admin/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching department data:', error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExpandedDepartment(null);
        setIsDropdownOpen(false);
        document.body.classList.remove('blurred');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };

  const groupedDepartments = departments.reduce((acc, department) => {
    if (!acc[department.department]) {
      acc[department.department] = {
        name: department.department,
        workers: [],
      };
    }
    acc[department.department].workers.push(`${department.name} ${department.surname}` || 'N/A');
    return acc;
  }, {});

  const groupedDepartmentsArray = Object.values(groupedDepartments);

  const filteredDepartments = groupedDepartmentsArray.filter((department) =>
    department.name ? department.name.toLowerCase().includes(searchTerm) : false
  );

  const handleToggle = (department) => {
    const newExpandedDepartment = expandedDepartment === department ? null : department;
    setExpandedDepartment(newExpandedDepartment);
    setIsDropdownOpen(newExpandedDepartment !== null);

    if (newExpandedDepartment) {
      document.body.classList.add('blurred');
    } else {
      document.body.classList.remove('blurred');
    }
  };

  const handleAddDepartment = async (departmentData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
        return;
      }

      console.log('Gönderilen veri:', departmentData); // Debug için

      const response = await axios.post('http://localhost:8080/api/admin/add', 
        departmentData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert('Departman başarıyla eklendi');
        // Departman listesini güncelle
        const updatedResponse = await axios.get('http://localhost:8080/api/admin/getAll', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDepartments(updatedResponse.data);
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error adding department:', error);
      alert('Departman eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="department-list-container">
      <div className="department-list-header">
        <h3>Departmanlar ({filteredDepartments.length})</h3>
        <div className="department-list-actions">
          <Button variant="outline-success">İçe Aktar</Button>
          <Button variant="success" onClick={() => setShowModal(true)}>
            + Yeni Departman Oluştur
          </Button>
        </div>
      </div>
      <SearchBar onSearch={handleSearch} placeholder="Departman Ara" />
      <Table responsive bordered>
        <thead>
          <tr>
            <th>Departman Adı</th>
            <th>Çalışanlar</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department, index) => (
            <tr key={index}>
              <td>{department.name || 'N/A'}</td>
              <td>
                <div ref={dropdownRef} className={`dropdown-wrapper ${isDropdownOpen ? 'active' : ''}`}>
                  <span>
                    {department.workers.length > 0 ? department.workers[0] : 'N/A'}
                  </span>
                  <FaCaretDown
                    className="dropdown-icon"
                    onClick={() => handleToggle(department.name)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                  />
                  {expandedDepartment === department.name && (
                    <div className="dropdown-menu1">
                      <div className="dropdown-scroll">
                        {department.workers.map((worker, idx) => (
                          <div key={idx} className="dropdown-item">{worker}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showModal && (
        <NewDepartment 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          onSave={handleAddDepartment}
        />
      )}
    </div>
  );
};

export default Departments;
