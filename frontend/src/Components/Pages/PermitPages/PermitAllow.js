import React, { useState, useEffect,useContext } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import axios from 'axios';

import { AuthContext } from '../../../Context/AuthContext';
import './Permit.css';

const PermitAllow = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.roles.includes('ROLE_ADMIN');

  // Function to fetch leave requests from API
  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust if using context
      const response = await axios.get('http://localhost:8080/api/permission/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const waitRequests = response.data.filter(request => request.isActive === 'WAIT');
      setLeaveRequests(waitRequests);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error('Error fetching leave requests:', error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put('http://localhost:8080/api/permission/update-status', {
        id,
        isActive: status
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLeaveRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
      console.error(`Error ${status === 'ACCEPT' ? 'approving' : 'rejecting'} request:`, error);
    }
  };

  const getStatus = (isActive) => {
    switch (isActive) {
      case 'ACCEPT':
        return 'KABUL EDİLDİ';
      case 'REFUSE':
        return 'REDDEDİLDİ';
      case 'WAIT':
        return 'BEKLENİYOR';
      default:
        return 'BİLİNMEYEN DURUM';
    }
  };

  // Function to parse dates
  const parseDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const [day, month, year] = dateString.split('-');
    return new Date(`${year}-${month}-${day}`).toLocaleDateString('tr-TR');
  };

  return (
    <div>
      {isAdmin &&
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>İzin Talepleri</Card.Title>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading data.</p>
          ) : leaveRequests.length === 0 ? (
            <p>Henüz izin talebi yok.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                  <th>Durum</th>
                  <th>E-posta</th>
                  <th>Gün Sayısı</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{parseDate(request.startDate)}</td>
                    <td>{parseDate(request.endDate)}</td>
                    <td>{getStatus(request.isActive)}</td>
                    <td>{request.email}</td>
                    <td>{request.daysBetweenDates}</td>
                    <td>
                      <Button variant="success" onClick={() => handleStatusChange(request.id, 'ACCEPT')}>KABUL ET</Button>{' '}
                      <Button variant="danger" onClick={() => handleStatusChange(request.id, 'REFUSE')}>REDDET</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>}
    </div>
  );
};

export default PermitAllow;
