import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ModalTitle, Nav } from 'react-bootstrap';
import Countries from '../../countries.json';
import './NewDepartment.css'; // Import your custom CSS

const Organization = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    setCountryList(Countries); // Set countries from JSON to state
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" className="new-department-modal">
      <Modal.Header closeButton>
        <ModalTitle>Yeni Organizasyon Oluştur</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange} className="mb-3 new-department-nav">
          <Nav.Item>
            <Nav.Link eventKey="basic">Temel Bilgiler</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="address">Adres Bilgileri</Nav.Link>
          </Nav.Item>
        </Nav>
        <Form className="new-department-form">
          {activeTab === 'basic' && (
            <div>
              <Form.Group controlId="formDepartmentName" className="new-department-form-group">
                <Form.Label>Organizasyon Adı</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formDepartmentChef" className="new-department-form-group">
                <Form.Label>Departman</Form.Label>
                <Form.Control as="textarea" rows={1} />
              </Form.Group>
            </div>
          )}
          {activeTab === 'address' && (
            <div>
              <Form.Group controlId="formCountry" className="new-department-form-group">
                <Form.Label>Ülke</Form.Label>
                <Form.Control as="select">
                  <option value="" disabled selected>Ülke Seçiniz</option>
                  {countryList.map((country, index) => (
                    <option key={index}>{country.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formCity" className="new-department-form-group">
                <Form.Label>İl</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formAddress" className="new-department-form-group">
                <Form.Label>Adres</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer className="new-department-footer">
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
        <Button variant="success" type="submit" onClick={handleClose}>
          Departman Oluştur
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Organization;
