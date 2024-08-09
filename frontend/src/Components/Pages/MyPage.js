import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userProfileImage from '../../assets/userprofile.png';
import ChangePasswordModal from '../Modals/ChangePasswordModal';


const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/getById/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  const { id, name, surname, email, phone, date, department, is_active, gender } = userData || {};

  const formatDateToDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col sm={10} md={4}>
          <Card className="text-center" style={{ maxWidth: '250px', margin: '0 auto' }}>
            <Card.Img variant="top" src={userProfileImage} alt="Profile Picture" />
            <Card.Body>
              <Card.Title>{name} {surname}</Card.Title>
              <Card.Text>{email}</Card.Text>
              <Button variant="success" onClick={() => setShowChangePassword(true)}>Şifre Değiştir</Button>
              <Button variant="danger" className="mt-2" onClick={handleLogout}>Logout</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={10} md={8}>
          <Card>
            <Card.Header as="h5">Temel Bilgiler</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Id:</strong> {id}</ListGroup.Item>
              <ListGroup.Item><strong>Adı Soyadı:</strong> {name} {surname}</ListGroup.Item>
              <ListGroup.Item><strong>Telefon No:</strong> {phone}</ListGroup.Item>
              <ListGroup.Item><strong>E-posta:</strong> {email}</ListGroup.Item>
              <ListGroup.Item><strong>Doğum Tarihi:</strong> {formatDateToDisplay(date)}</ListGroup.Item>
              <ListGroup.Item><strong>Cinsiyet:</strong> {gender}</ListGroup.Item>
              <ListGroup.Item><strong>Departman:</strong> {department}</ListGroup.Item>
              <ListGroup.Item><strong>Aktif Durumu:</strong> {is_active ? 'Evet' : 'Hayır'}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <ChangePasswordModal show={showChangePassword} handleClose={() => setShowChangePassword(false)} />
    </Container>
  );
};

export default MyPage;
