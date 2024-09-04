import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';


const ChangePasswordModal = ({ show, handleClose }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { authState } = useContext(AuthContext);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setError('Yeni şifreler eşleşmiyor.');
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
      
      setSuccess('Şifreniz başarıyla değiştirildi.');
      setError(null);
      setOldPass('');
      setNewPass('');
      setConfirmPass('');
    } catch (err) {
      console.error('Error:', err.response || err);
      setError('Şifre değiştirme işlemi başarısız oldu.');
      setSuccess(null);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Şifre Değiştir</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleChangePassword}>
          <Form.Group controlId="formOldPassword">
            <Form.Label>Mevcut Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mevcut şifrenizi giriniz"
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword" className="mt-3">
            <Form.Label>Yeni Şifre</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni şifrenizi giriniz"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Yeni Şifreyi Onayla</Form.Label>
            <Form.Control
              type="password"
              placeholder="Yeni şifrenizi tekrar giriniz"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose} className="mt-4">
                İptal
            </Button>
          <Button variant="success" type="submit" className="mt-4">
            Şifreyi Değiştir
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
