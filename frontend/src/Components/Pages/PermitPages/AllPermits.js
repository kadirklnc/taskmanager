import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';
import './Permit.css';

const AllPermits = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch leave requests from API
  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token'); // Adjust if using context
      const response = await axios.get('http://localhost:8080/api/permission/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setLeaveRequests(response.data);
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

  return (
    <div>
      

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
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{new Date(request.startDate).toLocaleDateString()}</td>
                    <td>{new Date(request.endDate).toLocaleDateString()}</td>
                    <td>{getStatus(request.isActive)}</td>
                    <td>{request.email}</td>
                    <td>{request.daysBetweenDates}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default AllPermits;
