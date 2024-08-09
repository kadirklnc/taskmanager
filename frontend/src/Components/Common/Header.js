import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [firstName, setFirstName] = useState(''); // State to store the first name
    const [lastName, setLastName] = useState(''); // State to store the last name
    const userId = localStorage.getItem('id'); // Get the user ID from local storage
    const token = localStorage.getItem('token'); // Get the token from local storage

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
                setFirstName(response.data.name); // Assume the response contains a 'name' field
                setLastName(response.data.surname)
            } catch (err) {
                console.error(err);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, token]);

    return (
        <header className="header-container">
            <div className="header-left">Home Page</div>
            <div className="header-right">
                <span className="header-username" onClick={toggleDropdown}>
                    Hoş Geldin {firstName} {lastName}
                </span>
                <div className="profile-icon-container" onClick={toggleDropdown}>
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
