import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import './login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleLogin = async () => {
        if (!captchaValue) {
            setError('Lütfen CAPTCHA\'yı tamamlayın');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password,
                captcha: captchaValue,
            });

            const { token, id, roles } = response.data;
            login(token, email, roles);
            localStorage.setItem('id', id);

            if (roles.includes('ROLE_USER')) {
                navigate('/homepage');
            } else if (roles.includes('ROLE_MODERATOR')) {
                navigate('/homepage');
            } else if (roles.includes('ROLE_ADMIN')) {
                navigate('/homepage');
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 429) {
                    setError('Çok fazla hatalı giriş. Lütfen tekrar deneyin.');
                } else {
                    setError('Giriş başarısız oldu. Lütfen e-posta ve şifrenizi kontrol edin.');
                }
            } else {
                setError('Bir şeyler ters gitti. Lütfen tekrar deneyin.');
            }
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="formContainer">
            <div className="login-image-container"></div>
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
                            required
                        />
                    </Form.Group>

                    <Form.Group className="formInput">
                        <Form.Label>Şifre</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Şifrenizi giriniz"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <ReCAPTCHA
                        sitekey="6LeokSUrAAAAAF-PnGqFHc3CC7oaDS0WVsP9v4Mh"
                        onChange={handleCaptchaChange}
                        size="normal"
                    />

                    <Button variant="success" className="customButtonGiris" onClick={handleLogin}>
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
};

export default Login;
