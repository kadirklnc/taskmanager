import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import './Permit.css';

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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
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
          <Card.Title>Yıllık İzin</Card.Title>
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
            <p>Error loading data.</p>
          ) : leaveRequests.length === 0 ? (
            <p>Henüz izin talebiniz yok.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                  <th>Durum</th>
                  <th>E-posta</th>
                  <th>Gün Sayısı</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => {
                  const startDate = new Date(request.startDate).toLocaleDateString();
                  const endDate = new Date(request.endDate).toLocaleDateString();
                  return (
                    <tr key={request.id}>
                      {/* <td>{request.id}</td> */}
                      <td>{startDate}</td>
                      <td>{endDate}</td>
                      <td>{getStatus(request.isActive)}</td>
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

const RequestModal = ({ show, handleClose, handleSave }) => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>İzin Talebi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Başlangıç Tarihi</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bitiş Tarihi</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Açıklama</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LeaveRequest;
