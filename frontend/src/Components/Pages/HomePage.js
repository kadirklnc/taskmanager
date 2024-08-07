import React, { useState, useEffect, useContext } from 'react';
import { Card, Button, Row, Col, Table } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './HomePage.css';
import '../Common/Main.css';
import RequestModal from '../Modals/RequestModal';
import NewDepartment from '../Modals/NewDepartment';
import NewEmployee from '../Modals/NewEmployee';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
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

  const handleShowRequestModal = () => setShowRequestModal(true);
  const handleCloseRequestModal = () => setShowRequestModal(false);

  const handleShowDepartmentModal = () => setShowDepartmentModal(true);
  const handleCloseDepartmentModal = () => setShowDepartmentModal(false);

  const handleShowEmployeeModal = () => setShowEmployeeModal(true);
  const handleCloseEmployeeModal = () => setShowEmployeeModal(false);

  const isAdmin = authState.roles.includes('ROLE_ADMIN');
  const isUser = authState.roles.includes('ROLE_USER');

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
          <Button size="sm" className="btn-new-button" onClick={handleShowRequestModal}>
            + Yeni Talep Oluştur
          </Button>
        )}
        {' '}
        {isAdmin && (
          <>
            <Button size="sm" className="btn-new-button" onClick={handleShowDepartmentModal}>
              + Yeni Departman Oluştur
            </Button>
            {' '}
            <Button size="sm" className="btn-new-button" onClick={handleShowEmployeeModal}>
              + Yeni Çalışan Oluştur
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
                    const startDate = new Date(request.startDate).toLocaleDateString();
                    const endDate = new Date(request.endDate).toLocaleDateString();
                    return (
                      <tr key={request.id}>
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

      <RequestModal show={showRequestModal} handleClose={handleCloseRequestModal} />
      <NewDepartment show={showDepartmentModal} handleClose={handleCloseDepartmentModal} />
      <NewEmployee show={showEmployeeModal} handleClose={handleCloseEmployeeModal} />
    </div>
  );
};

export default HomePage;
