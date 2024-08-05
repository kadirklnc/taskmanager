import React, { useState } from 'react';
import { Card, Button, Table, Modal, Form } from 'react-bootstrap';
import './Permit.css';

const LeaveRequest = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);

  const handleShowRequestModal = () => setShowRequestModal(true);
  const handleCloseRequestModal = () => setShowRequestModal(false);

  const remainingLeave = 1;
  const totalLeave = 0;
  const nextEntitlementDate = '22 Temmuz 2025';

  const handleAddLeaveRequest = (newRequest) => {
    setLeaveRequests([...leaveRequests, newRequest]);
    handleCloseRequestModal();
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Yıllık İzin</Card.Title>
          <div className="d-flex align-items-center">
            <div className="circle-progress">
              <div className="progress-label">
                Kalan
                <div className="days-left">{remainingLeave} Gün</div>
              </div>
            </div>
            <div className="ml-4">
              <p><strong>Kalan İzin Süresi:</strong> {remainingLeave} Gün</p>
              <p><strong>Yıllık Hak Edilen İzin Süresi:</strong> {totalLeave} Gün</p>
              <p><strong>Sonraki Hakedis Tarihi:</strong> {nextEntitlementDate}</p>
            </div>
          </div>
          <Button variant="success" className="mt-3" onClick={handleShowRequestModal}>+ İzin Talebi</Button>
        </Card.Body>
      </Card>

      <RequestModal 
        show={showRequestModal} 
        handleClose={handleCloseRequestModal} 
        handleAddLeaveRequest={handleAddLeaveRequest} 
      />

      <Card className="mt-3">
        <Card.Body>
          <Card.Title>İzin Talepleri</Card.Title>
          {leaveRequests.length === 0 ? (
            <p>Henüz izin talebi yok.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Talep Tarihi</th>
                  <th>İzin Tipi</th>
                  <th>Durumu</th>
                  <th>Bitiş Tarihi</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Süresi</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.date}</td>
                    <td>{request.leaveType}</td>
                    <td>{request.status}</td>
                    <td>{request.endDate}</td>
                    <td>{request.startDate}</td>
                    <td>{request.duration} Gün</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

const RequestModal = ({ show, handleClose, handleAddLeaveRequest }) => {
  const [date, setDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = { date, leaveType, status, startDate, endDate, duration, description };
    handleAddLeaveRequest(newRequest);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>İzin Talebi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>İzin Kullanan Kişi </Form.Label>
            <Form.Control
              type="text"
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>İzin Türü </Form.Label>
            <Form.Control
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Başlangıç Zamanı </Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bitiş Zamanı</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Süresi (Gün)</Form.Label>
            <Form.Control
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Açıklama</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Kaydet
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LeaveRequest;
