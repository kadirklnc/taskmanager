import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import userProfileImage from '../../assets/userprofile.png';
import ChangePasswordModal from '../Modals/ChangePasswordModal';
import './MyPage.css';

const MyPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/getById/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserData(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate('/');
  };

  const { id, name, surname, email, phone, date, department, is_active, gender } = userData || {};

  const formatDateToDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="page-container">
      <div className="page-grid">
        <div className="profile-card">
          <div className="profile-section">
            <img 
              src={userProfileImage} 
              alt="Profile Picture" 
              className="profile-image"
            />
            <h4 className="profile-name">{name} {surname}</h4>
            <p className="profile-email">{email}</p>
            <div className="button-container">
              <button 
                className="btn-password"
                onClick={() => setShowChangePassword(true)}
              >
                Şifre Değiştir
              </button>
              <button 
                className="btn-logout"
                onClick={handleLogout}
              >
                Oturumu Kapat
              </button>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-header">
            <h5>Temel Bilgiler</h5>
          </div>
          <ul className="info-list">
            <li className="info-item">
              <span className="info-label">Id:</span>
              <span className="info-value">{id}</span>
            </li>
            <li className="info-item">
              <span className="info-label">Adı Soyadı:</span>
              <span className="info-value">{name} {surname}</span>
            </li>
            <li className="info-item">
              <span className="info-label">Telefon No:</span>
              <span className="info-value">{phone}</span>
            </li>
            <li className="info-item">
              <span className="info-label">E-posta:</span>
              <span className="info-value">{email}</span>
            </li>
            <li className="info-item">
              <span className="info-label">Doğum Tarihi:</span>
              <span className="info-value">{formatDateToDisplay(date)}</span>
            </li>
            <li className="info-item">
              <span className="info-label">Cinsiyet:</span>
              <span className="info-value">{gender}</span>
            </li>
            <li className="info-item">
              <span className="info-label">Departman:</span>
              <span className="info-value">{department}</span>
            </li>
            <li className="info-item">
              <span className="info-label">Aktif Durumu:</span>
              <span className="info-value">{is_active ? 'Evet' : 'Hayır'}</span>
            </li>
          </ul>
        </div>
      </div>
      <ChangePasswordModal show={showChangePassword} handleClose={() => setShowChangePassword(false)} />
    </div>
  );
};

export default MyPage;
