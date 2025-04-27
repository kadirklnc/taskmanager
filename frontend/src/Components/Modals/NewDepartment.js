import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const NewDepartment = ({ show, handleClose, onSave }) => {
  const [formData, setFormData] = useState({
    department: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.department.trim() || !formData.name.trim()) {
      alert('Lütfen tüm alanları doldurunuz');
      return;
    }

    // Backend'in beklediği formatta veri gönder
    onSave({ 
      department: formData.department.trim(),
      name: formData.name.trim(),
      surname: "-",
      email: "-",
      password: "-",
      phone: "-",
      date: "2024-01-01",
      gender: "-",
      is_active: 1,
      role: ["USER"]
    });

    // Formu temizle
    setFormData({
      department: '',
      name: ''
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Yeni Departman Ekle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Departman Adı</Form.Label>
            <Form.Control
              type="text"
              placeholder="Departman adını giriniz"
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Çalıșan Adı</Form.Label>
            <Form.Control
              type="text"
              placeholder="Çalıșan adını giriniz"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewDepartment;
