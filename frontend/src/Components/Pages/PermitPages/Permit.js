import { React, useState } from 'react';
import { Card, Button, Nav, NavLink } from 'react-bootstrap';
import './Permit.css';
import RequestModal from '../../Modals/RequestModal';

const LeaveRequest = () => {

  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleShowRequestModal = () => setShowRequestModal(true);
  const handleCloseRequestModal = () => setShowRequestModal(false);

  const remainingLeave = 1;
  const totalLeave = 0;
  const nextEntitlementDate = '22 Temmuz 2025';

  return (
    <div >

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
      <RequestModal show={showRequestModal} handleClose={handleCloseRequestModal} />
    </div>

  );
};

export default LeaveRequest;
