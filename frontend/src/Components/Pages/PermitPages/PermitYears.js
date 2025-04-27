import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';

const PermitYears = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Veri çekme fonksiyonu
  const fetchLeaveData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/admin/getAll', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setLeaveData(response.data);
      } else {
        setLeaveData([]);
        console.error('Unexpected response format:', response.data);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error('Error fetching leave data:', error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Yıllık İzin Süreleri</Card.Title>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading data.</p>
          ) : leaveData.length === 0 ? (
            <p>Henüz izin verisi yok.</p>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Ad Soyad</th>
                  <th>Kalan İzin Gün Sayısı</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map((leave) => {
                  const remainingDays = leave.totalLeaveDays; // Kalan izin günleri doğrudan göster
                  return (
                    <tr key={leave.id}>
                      <td>{leave.name} {leave.surname}</td>
                      <td>{remainingDays}</td>
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

export default PermitYears;
