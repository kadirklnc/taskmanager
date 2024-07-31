import React, { useState } from 'react';
import { Modal, Button, Form, ModalTitle, Nav } from 'react-bootstrap';

const NewDepartment = ({ show, handleClose }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <ModalTitle>Yeni Departman Oluştur</ModalTitle>
      </Modal.Header>
      <Modal.Body>
        <Nav variant="tabs" activeKey={activeTab} onSelect={handleTabChange}>
          <Nav.Item>
            <Nav.Link eventKey="basic">Temel Bilgiler</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="address">Adres Bilgileri</Nav.Link>
          </Nav.Item>
        </Nav>
        <Form>
          {activeTab === 'basic' && (
            <div>
              <Form.Group controlId="formDepartmentName">
                <Form.Label>Departman Adı</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group controlId="formDepartmentConnect">
                <Form.Label>Bağlı Olduğu Departman</Form.Label>
                <Form.Control as="textarea" rows={3}  />
              </Form.Group>
              <Form.Group controlId="formDepartmentChef">
                <Form.Label>Departman Yöneticisi</Form.Label>
                <Form.Control as="textarea" rows={3}  />
              </Form.Group>
            </div>
          )}
          {activeTab === 'address' && (
            <div>
              <Form.Group controlId="formCountry">
                <Form.Label>Ülke</Form.Label>
                <Form.Control as="select">
                  <option>Türkiye</option>
                  {/* Diğer ülkeler buraya eklenebilir */}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>İl</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group controlId="formDistrict">
                <Form.Label>İlçe</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group controlId="formNeighborhood">
                <Form.Label>Mahalle</Form.Label>
                <Form.Control type="text"  />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Adres</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleClose}>
          Departman Oluştur
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          İptal
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewDepartment;