import React, { useState, useContext } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './HomePage.css';
import '../Common/Main.css';
import RequestModal from '../Modals/RequestModal';

import { AuthContext } from '../../Context/AuthContext';
import NewDepartment from '../Modals/NewDepartment';
import NewEmployee from '../Modals/NewEmployee';

const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  const handleShowRequestModal = () => setShowRequestModal(true);
  const handleCloseRequestModal = () => setShowRequestModal(false);

  const handleShowDepartmentModal = () => setShowDepartmentModal(true);
  const handleCloseDepartmentModal = () => setShowDepartmentModal(false);

  const handleShowEmployeeModal = () => setShowEmployeeModal(true);
  const handleCloseEmployeeModal = () => setShowEmployeeModal(false);

  const isAdmin = authState.roles.includes('ROLE_ADMIN');
  const isUser = authState.roles.includes('ROLE_USER');

  return (
    <div className="content-container">
      <h1 className="page-title">Ana Sayfa</h1>
      <div className="button-container">
        {isUser &&(
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
        <>
          <Card className="custom-card">
            <Card.Body>
              <Card.Title>İzin Taleplerim</Card.Title>
              <Card.Text>
                Bu, mevcut kartın altında eklenen yeni bir karttır. Buraya metin veya diğer içerikleri ekleyebilirsiniz.
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="custom-card">
            <Card.Body>
              <Card.Title>İzin Onayları</Card.Title>
              <Card.Text>
                Bu, mevcut kartın altında eklenen yeni bir karttır. Buraya metin veya diğer içerikleri ekleyebilirsiniz.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
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
      <NewEmployee show={showEmployeeModal} handleClose={handleCloseEmployeeModal}></NewEmployee>
    </div>
  );
};

export default HomePage;
