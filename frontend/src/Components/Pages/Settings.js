import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Settings.css';

export default function Settings() {
  const { authState } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(true);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setMessage({ type: 'danger', text: 'Yeni şifreler eşleşmiyor.' });
      return;
    }
    try {
      const response = await axios.put(
        'http://localhost:8080/api/user/change-password',
        {
          oldPass,
          newPass
        },
        {
          headers: {
            'Authorization': `Bearer ${authState.token}`
          }
        }
      );
      
      setMessage({ type: 'success', text: 'Şifreniz başarıyla değiştirildi.' });
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err) {
      console.error('Error:', err.response || err);
      setMessage({ type: 'danger', text: 'Şifre değiştirme işlemi başarısız oldu.' });
    }
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <Container className="settings-container">
      <h3 className="settings-header">Ayarlar</h3>
      {message && (
        <Alert variant={message.type} onClose={() => setMessage(null)} dismissible>
          {message.text}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Hesap Ayarları</Card.Header>
              <Card.Body>
               
                <Form.Group className="mb-3">
                  <Form.Label>Mevcut Şifre</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={oldPass} 
                    onChange={(e) => setOldPass(e.target.value)}
                    placeholder="Mevcut şifrenizi girin" 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Yeni Şifre</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={newPass} 
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Yeni şifrenizi girin" 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Yeni Şifre (Tekrar)</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={confirmPass} 
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Yeni şifrenizi tekrar girin" 
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Uygulama Ayarları</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="notification-switch"
                    label="Bildirimler"
                    checked={notification}
                    onChange={(e) => setNotification(e.target.checked)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tema</Form.Label>
                  <Form.Select 
                    value={theme} 
                    onChange={handleThemeChange}
                  >
                    <option value="light">Açık Tema</option>
                    <option value="dark">Koyu Tema</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Ayarları Kaydet
        </Button>
      </Form>
    </Container>
  );
}