import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import userProfileImage from '../../assets/userprofile.png'; //src/assets

const MyPage = () => {

    const username = localStorage.getItem('username'); // Local storage'dan username'i oku
    const email = localStorage.getItem('email'); // Local storage'dan email'i oku
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col sm={10} md={4}>
                    <Card className="text-center" style={{ maxWidth: '270px', margin: '0 auto' }}>
                        <Card.Img variant="top" src={userProfileImage} alt="Profile Picture" />
                        <Card.Body>
                            <Card.Title> {username} </Card.Title>
                            <Card.Text>
                                izmirvucaj1234@gmail.com
                            </Card.Text>
                            <Button variant="success">Şifre Değiştir</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={10} md={8}>
                    <Card>
                        <Card.Header as="h5">Temel Bilgiler</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Adı:</strong> Izmir</ListGroup.Item>
                            <ListGroup.Item><strong>Soyadı:</strong> Vuçaj</ListGroup.Item>
                            <ListGroup.Item><strong>Departman:</strong> Yazilim</ListGroup.Item>
                            <ListGroup.Item><strong>Şirkete Giriş Tarihi:</strong> 22 Temmuz 2024</ListGroup.Item>
                        </ListGroup>


                    </Card>

                    <Card className="mt-3">
                        <Card.Header as="h5">Kişisel Bilgiler</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>TC Kimlik Numarası:</strong> -</ListGroup.Item>
                            <ListGroup.Item><strong>Doğum Tarihi:</strong>-</ListGroup.Item>
                            <ListGroup.Item><strong>Cinsiyet:</strong>-</ListGroup.Item>
                            <ListGroup.Item><strong>Sicil No:</strong> -</ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Card className="mt-3 mb-3">
                        <Card.Header as="h5">İletişim</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>E-posta Adresi:</strong> -</ListGroup.Item>
                            <ListGroup.Item><strong>Cep Telefonu:</strong> -</ListGroup.Item>
                            <ListGroup.Item><strong>Ülke:</strong> -</ListGroup.Item>
                            <ListGroup.Item><strong>İl:</strong> -</ListGroup.Item>
                            <ListGroup.Item><strong>İlce:</strong> -</ListGroup.Item>
                            <ListGroup.Item><strong>Adres:</strong> -</ListGroup.Item>
                        </ListGroup>
                    </Card>


                </Col>
            </Row >
        </Container >
    );
};

export default MyPage;