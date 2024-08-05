import React, { useState } from 'react';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const username = localStorage.getItem('username'); // Get the username from local storage

    const toggleDropdown = () => {
        setDropdownVisible(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        window.location.href = '/'; // Navigate to homepage after logout
    };

    return (
        <header className="header-container">
            <div className="header-left">Home Page</div>
            <div className="header-right">
                {username ? (
                    <>
                        <span className="header-username" onClick={toggleDropdown}>
                            Hoş Geldin {username}
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
                    </>
                ) : null}
            </div>
        </header>
    );
}

export default Header;
