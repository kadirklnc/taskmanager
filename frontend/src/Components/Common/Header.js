import React from 'react';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
    const username = localStorage.getItem('username'); // Local storage'dan username'i oku

    return (
        <header className="header-container">
            <div className="header-left">Home Page</div>
            <div className="header-right">
                {username ? (
                    <span className="header-username">Hoş Geldin {username}</span>
                ) : (
                    <a href="/login">{username}</a>
                )}
                <a href="/profile" className="profile-link"></a>
                <i className="fa-solid fa-user header-icon"></i>
            </div>
        </header>
    );
}

export default Header;
