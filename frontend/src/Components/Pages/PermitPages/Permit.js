import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './Permit.css';
import RequestModal from './RequestModal'; // Import the modal

const LeaveRequest = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      const response = await axios.get(`http://localhost:8080/api/permission/getByUserId/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setLeaveRequests(response.data);
      } else {
        setLeaveRequests([]);
        console.error('Unexpected response format:', response.data);
      }

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

  const handleAddLeaveRequest = async (newRequest) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('id');
      newRequest.userId = userId;
      const response = await axios.post('http://localhost:8080/api/permission/add', newRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setLeaveRequests([...leaveRequests, response.data]);
        setShowRequestModal(false);
      } else {
        console.error('Failed to save leave request:', response);
      }
    } catch (error) {
      console.error('Error saving leave request data:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      console.log('Deleting request with ID:', id); // Add this for debugging
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/permission/delete-status/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the leaveRequests state after deletion
      setLeaveRequests(leaveRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error('Error deleting leave request:', error);
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

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>İzin Al</Card.Title>
          <Button variant="success" className="mt-3" onClick={() => setShowRequestModal(true)}>
            + İzin Talebi
          </Button>
        </Card.Body>
      </Card>

      <RequestModal
        show={showRequestModal}
        handleClose={() => setShowRequestModal(false)}
        handleSave={handleAddLeaveRequest}
      />

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>İzin Talepleri</Card.Title>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>İzin talebiniz yok</p>
          ) : leaveRequests.length === 0 ? (
            <p>Henüz izin talebiniz yok.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Talep Tarihi</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                  <th>Durum</th>
                  <th>Açıklama</th>
                  <th>E-posta</th>
                  <th>Gün Sayısı</th>
                  {/* <th>Aksiyonlar</th> */}
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => {
                  const parseDate = (dateString) => {
                    if (!dateString) return 'Invalid Date';
                    const [day, month, year] = dateString.split('-');
                    return new Date(`${year}-${month}-${day}`).toLocaleDateString('tr-TR');
                  };

                  const startDate = parseDate(request.startDate);
                  const endDate = parseDate(request.endDate);

                  return (
                    <tr key={request.id}>
                      <td>{request.created_at}</td>
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td>{getStatus(request.isActive)}</td>
                      <td>{request.description}</td>
                      <td>{request.email}</td>
                      <td>{request.daysBetweenDates}</td>
                      
                       
                    
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default LeaveRequest;
