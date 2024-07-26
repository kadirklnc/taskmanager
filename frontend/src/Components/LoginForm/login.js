import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/auth/signin', { email, password });
            console.log('API response:', response);
            // Assuming response contains a token or success message
            localStorage.setItem('token', response.data.token);
            navigate('/homepage'); 
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your email and password.');
        }
    };

    const handleSignUp = () => {
        navigate('/signup'); 
    };

    return (
        <div className="formContainer">
            <div className="login-image-container">
                {/* <img src="your-image-url.jpg" alt="Login Illustration" className="login-image" /> */}
            </div>
            <div className="form-container">
                <Form>
                    <div className="formInputHeader">
                        <p className="formText">DailyChart'a Hoş Geldiniz</p>
                    </div>
                    
                    <Form.Group className="formInput">
                        <Form.Label>E-posta</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="E-posta adresinizi giriniz" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group className="formInput">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Şifrenizi giriniz" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Button variant="success" className='customButtonGiris' onClick={handleLogin}>
                        Giriş Yap
                    </Button>
                    
                    {error && <p className="errorMessage" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    
                    <p className="signUpPrompt" style={{ marginTop: '10px', textAlign: 'center' }}>
                        Hala bir hesabın yok mu? 
                        <a href="#" onClick={handleSignUp} style={{ color: 'green' }}> Kayıt Ol!</a>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default Login;
