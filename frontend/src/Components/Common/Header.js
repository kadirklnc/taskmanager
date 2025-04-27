import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from '../../assets/Dailychart.png'; // Add your logo image here

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        window.location.href = '/'; // Navigate to homepage after logout
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/admin/getById/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFirstName(response.data.name);
                setLastName(response.data.surname);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false); // name,surname icin Yüklenme durumu tamamlandı
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, token]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="header-container">
            <div className="header-left">
                {/* <img src={logo} alt="Logo" className="header-logo" /> */}
            </div>
            <div className="header-right">
                <span className="header-username" onClick={toggleDropdown}>
                    {loading ? "Yükleniyor..." : `Hoş Geldin ${firstName} ${lastName}`}
                </span>
                <div className="profile-icon-container" onClick={toggleDropdown} ref={dropdownRef}>
                    <i className="fa-solid fa-user header-icon"></i>
                    {dropdownVisible && (
                        <div className="dropdown-menu">
                            <a href="/homepage/mypage" className="dropdown-item">Benim Sayfam</a>
                            <a href="/change-password" className="dropdown-item">Şifre Değiştir</a>
                            <a href="#" className="dropdown-item" onClick={handleLogout}>Oturumu Kapat</a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
