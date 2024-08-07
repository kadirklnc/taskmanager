import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const PermitYears = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newLeaveDays, setNewLeaveDays] = useState(0); // Güncel izin günleri
  const [applyToAll, setApplyToAll] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');

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

  // Güncelleme işlemi fonksiyonu
  const handleUpdateLeaveDays = async () => {
    try {
      const token = localStorage.getItem('token');
      const payload = applyToAll
        ? { leaveDays: Number(newLeaveDays) }
        : { id: selectedUser, newLeaveDays: Number(newLeaveDays) };

      const response = await axios.post('http://localhost:8080/api/permission/update-leave-days', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        fetchLeaveData(); // Güncellenmiş veriyi tekrar çek
        setShowUpdateModal(false);
      } else {
        console.error('Failed to update leave days:', response);
      }
    } catch (error) {
      console.error('Error updating leave days:', error);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Yıllık İzin Süreleri</Card.Title>
          <Button variant="primary" onClick={openUpdateModal}>
            Toplam Gün Sayısını Güncelle
          </Button>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading data.</p>
          ) : leaveData.length === 0 ? (
            <p>Henüz izin verisi yok.</p>
          ) : (
            <Table striped bordered hover>
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

      <UpdateModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleSave={handleUpdateLeaveDays}
        leaveDays={newLeaveDays}
        setLeaveDays={setNewLeaveDays}
        applyToAll={applyToAll}
        setApplyToAll={setApplyToAll}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={leaveData} // Pass the leaveData to the modal as users
      />
    </div>
  );
};

// Güncelleme modal bileşeni
const UpdateModal = ({
  show,
  handleClose,
  handleSave,
  leaveDays,
  setLeaveDays,
  applyToAll,
  setApplyToAll,
  selectedUser,
  setSelectedUser,
  users,
}) => {
  const handleChange = (e) => {
    setLeaveDays(e.target.value);
  };

  const handleRadioChange = (e) => {
    setApplyToAll(e.target.value === 'all');
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Toplam Gün Sayısını Güncelle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>İzin Günlerini Giriniz *</Form.Label>
            <Form.Control
              type="number"
              value={leaveDays}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Kullanıcı Seçiniz *</Form.Label>
            <Form.Check
              type="radio"
              label="Tüm kullanıcılara uygula"
              name="applyToAll"
              value="all"
              checked={applyToAll}
              onChange={handleRadioChange}
            />
            <Form.Check
              type="radio"
              label="Belirli bir kullanıcı"
              name="applyToAll"
              value="specific"
              checked={!applyToAll}
              onChange={handleRadioChange}
            />
            {!applyToAll && (
              <Form.Control as="select" value={selectedUser} onChange={handleUserChange}>
                <option value="">Seçim Yapınız</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </Form.Control>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PermitYears;
