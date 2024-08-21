import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Table } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './HomePage.css';
import '../Common/Main.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleShowRequestModal = () => navigate('/homepage/permit');
  const handleShowDepartmentModal = () => navigate('/homepage/departments');;
  const handleCloseDepartmentModal = () => setShowDepartmentModal(false);
  const handleShowEmployeeModal = () => navigate('/homepage/employees');;
  const handleCloseEmployeeModal = () => setShowEmployeeModal(false);

  const isAdmin = authState.roles.includes('ROLE_ADMIN');
  const isUser = authState.roles.includes('ROLE_USER');
  const isModerator = authState.roles.includes('ROLE_MODERATOR');

  const getStatus = (status) => {
    switch (status) {
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
    <div className="content-container">
      <h1 className="page-title">Ana Sayfa</h1>
      <div className="button-container">
        {isUser && (
          <Button variant="success" size="sm" className="btn-new-button" onClick={handleShowRequestModal}>
            İzin Talep İşlemleri
          </Button>
        )}
        {' '}
        {isAdmin && (
          <>
            <Button variant="success" size="sm" className="btn-new-button" onClick={handleShowDepartmentModal}>
             Departman İşlemleri
            </Button>
            {' '}
            <Button variant="success" size="sm" className="btn-new-button" onClick={handleShowEmployeeModal}>
             Çalışan İşlemleri
            </Button>
          </>
        )}
      </div>

      <Card className="custom-card">
        <Card.Body>
          <Card.Title>İzin Bilgilerim</Card.Title>
          <Row>
            <Col className="text-center">
              <div className="circle-container">
                <CircularProgressbar
                  value={0}
                  text={0}
                  styles={buildStyles({
                    textColor: '#3e98c7',
                    pathColor: '#3e98c7',
                    trailColor: '#d6d6d6',
                  })}
                />
              </div>
              <div className="circle-label">Senelik İzin</div>
            </Col>
            <Col className="text-center">
              <div className="circle-container">
                <CircularProgressbar
                  value={0}
                  text={0}
                  styles={buildStyles({
                    textColor: '#f6b26b',
                    pathColor: '#f6b26b',
                    trailColor: '#d6d6d6',
                  })}
                />
              </div>
              <div className="circle-label">Aktif İzin Taleplerim</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {isUser && (
        <Card className="custom-card">
          <Card.Body>
            <Card.Title>İzin Taleplerim</Card.Title>
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
                    <th>Başlangıç Tarihi</th>
                    <th>Bitiş Tarihi</th>
                    <th>Durum</th>
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
                      <tr key={request.userId}>
                        <td>{startDate}</td>
                        <td>{endDate}</td>
                        <td>{getStatus(request.isActive)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      )}

      {isAdmin && (
        <>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Departman Yönetimi</Card.Title>
              <Card.Text>
                Bu bölümde departmanları yönetebilirsiniz.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="custom-card">
            <Card.Body>
              <Card.Title>Çalışan Yönetimi</Card.Title>
              <Card.Text>
                Bu bölümde çalışanları yönetebilirsiniz.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default HomePage;
