import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Organization.css';
import SearchBar from '../Common/SearchBar';
import NewOrganization from '../Modals/NewOrganization';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const Organization = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
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

        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query.toLowerCase());
  };

  const filteredOrganizations = organizations.filter((organization) =>
    organization.name ? organization.name.toLowerCase().includes(searchTerm) : false //if - else gibi
  );

  return (
    <div className="organization-container">
      <div className="organization-header">
        <h3>Organizasyonlar</h3>
        <div className="department-list-actions mb-3">
          <Button variant="outline-success" className="mr-2">İçe Aktar</Button>
          <Button variant="success" onClick={() => setShowModal(true)}>+ Yeni Organizasyon Oluştur</Button>
        </div>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Organizasyonda Ara" />

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Organizasyon Adı</th>
              <th scope="col">Departman</th>
              <th scope="col">Telefon No</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrganizations.map((organization, index) => (
              <tr key={index}>
                <td>{organization.name || 'N/A'}'in Organizasyonu</td>
                <td>{organization.department || 'N/A'}</td>
                <td>{organization.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewOrganization show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default Organization;
