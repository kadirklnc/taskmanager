
import React, { useState } from 'react';
import { Card, Button, Row, Col,Dropdown } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './HomePage.css'; 
import '../Common/Main.css';
import RequestModal from '../Modals/RequestModal'; 
import NewDepartment from '../Modals/NewDepartment';


const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleShowDepartmentModal = () => setShowDepartmentModal(true);
    const handleCloseDepartmentModal = () => setShowDepartmentModal(false);

    const handleShowEmployeeModal = () => setShowEmployeeModal(true);
    const handleCloseEmployeeModal = () => setShowEmployeeModal(false);

    

    return (
        <div className="content-container">
            <h1 className="page-title">Ana Sayfa</h1>
            <div className="button-container">
                <Button variant="primary" size="sm" className="btn-new-request" onClick={handleShowModal}>
                   + Yeni Talep Oluștur
                </Button>{' '}
               
            </div>

            <Card className="custom-card">
                <Card.Body>
                    <Card.Title>İzin Bilgilerim</Card.Title>
                    <Row>
                        <Col className="text-center">
                            <div className="circle-container">
                                <CircularProgressbar
                                    value={0}
                                    text={`0`}
                                    styles={buildStyles({
                                        textColor: "#3e98c7",
                                        pathColor: "#3e98c7",
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>
                            <div className="circle-label">Senelik İzin</div>
                        </Col>
                        <Col className="text-center">
                            <div className="circle-container">
                                <CircularProgressbar
                                    value={0}
                                    text={`0`}
                                    styles={buildStyles({
                                        textColor: "#f6b26b",
                                        pathColor: "#f6b26b",
                                        trailColor: "#d6d6d6"
                                    })}
                                />
                            </div>
                            <div className="circle-label">Aktif İzin Taleplerim</div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

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

            

           

            <RequestModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default HomePage;
