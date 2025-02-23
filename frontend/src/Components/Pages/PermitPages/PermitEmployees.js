import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Card, Spinner, Alert } from 'react-bootstrap';

export default function PermitEmployees() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/permission/getAll', {
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
    } catch (error) {
      setError(error.message || 'Veriler alınırken bir hata oluştu.');
      console.error('Error fetching leave requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const getTodayLeaveEmployees = () => {
    const today = new Date();
    return leaveRequests.filter((request) => {
      const startDate = new Date(request.startDate.split('-').reverse().join('-'));
      const endDate = new Date(request.endDate.split('-').reverse().join('-'));
      return (
        request.isActive === 'ACCEPT' &&
        today >= startDate &&
        today <= endDate
      );
    });
  };

  const todayLeaveEmployees = getTodayLeaveEmployees();

  return (
    <div className="permit-employees-container" style={{ marginTop: '20px', padding: '10px' }}>
      <Card className="mt-3">
        <Card.Body>
          <h4 className="mb-3">Bugün İzinli Çalışanlar</h4>

          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" role="status" />
              <p>Yükleniyor...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : todayLeaveEmployees.length === 0 ? (
            <p>Bugün izinli çalışan bulunmamaktadır.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Çalışan Email</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {todayLeaveEmployees.map((request) => (
                  <tr key={request.userId}>
                    <td>{request.email}</td>
                    <td>{request.startDate}</td>
                    <td>{request.endDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
