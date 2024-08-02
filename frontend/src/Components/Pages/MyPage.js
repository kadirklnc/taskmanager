import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import userProfileImage from '../../assets/userprofile.png'; 

const MyPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem("id")
    const token = localStorage.getItem('token'); 
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                console.log(token)
                const response = await axios.get(`http://localhost:8080/api/admin/getById/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in the request header
                    }
                });
                console.log("response",response)
                setUserData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]); // Include id in the dependency array

    // if (loading) return <div>Loading</div>;
    // if (error) return <div>Error</div>;

    // Database fields
    const { id,name, surname, email, phone, date, department, is_active, } = userData || {};
    console.log(name);
    return (
        <Container fluid>
            <Row className="mt-4">
                <Col sm={10} md={4}>
                    <Card className="text-center" style={{ maxWidth: '270px', margin: '0 auto' }}>
                        <Card.Img variant="top" src={userProfileImage} alt="Profile Picture" />
                        <Card.Body>
                            <Card.Title>{name} {surname}</Card.Title>
                            <Card.Text>{email}</Card.Text>
                            <Button variant="success">Şifre Değiştir</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={10} md={8}>
                    <Card>
                        <Card.Header as="h5">Temel Bilgiler</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>Id:</strong> {id}</ListGroup.Item>
                            <ListGroup.Item><strong>Adı Soyadı:</strong> {name} {surname}</ListGroup.Item>
                            <ListGroup.Item><strong>Telefon No:</strong> {phone}</ListGroup.Item>
                            <ListGroup.Item><strong>E-posta:</strong> {email}</ListGroup.Item>
                            <ListGroup.Item><strong>Doğum Tarihi:</strong> {date}</ListGroup.Item>
                            <ListGroup.Item><strong>Departman:</strong> {department}</ListGroup.Item>
                            <ListGroup.Item><strong>Aktif Durumu:</strong> {is_active ? 'Evet' : 'Hayır'}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MyPage;
