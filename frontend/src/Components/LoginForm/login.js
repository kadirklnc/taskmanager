import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Form, Button } from 'react-bootstrap';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); 

    const handleLogin = () => {
        navigate('/homepage'); 
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
                        <Form.Control type="email" placeholder="E-posta adresinizi giriniz" />
                    </Form.Group>
                    
                    <Form.Group className="formInput">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control type="password" placeholder="Şifrenizi giriniz" />
                    </Form.Group>
                    
                    <Button variant="success" className='customButtonGiris' onClick={handleLogin}>
                        Giriş Yap
                    </Button>
                    
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
