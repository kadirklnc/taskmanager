import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const handleSignUp = async () => {
        const newErrors = {};

        if (!email || !isValidEmail(email)) {
            newErrors.email = 'Geçerli bir e-posta adresi girin.';
        }
        if (!password) {
            newErrors.password = 'Şifre gerekli.';
        }
        if (!isChecked) {
            newErrors.isChecked = 'Lütfen üyelik sözleşmesini kabul ediniz.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            email,
            password,
            role: ['user']
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', data);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            setErrors({ submit: 'Signup failed. Please try again.' });
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <h1 className="signup-title">Kayıt Ol</h1>
                
                <div className="form-group">
                    <label htmlFor="email" className="form-label">E-posta *</label>
                    <input
                        type="text"
                        id="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="E-postanızı giriniz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Şifre *</label>
                    <input
                        type="password"
                        id="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="subscribeNewsletter"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="subscribeNewsletter">
                        Üyelik Sözleşmesi'ni okudum ve kabul ediyorum.
                    </label>
                    {errors.isChecked && <div className="text-danger">{errors.isChecked}</div>}
                </div>

                {errors.submit && (
                    <div className="errorMessage">{errors.submit}</div>
                )}

                <Button variant="success" className="customButtonGiris" onClick={handleSignUp}>
                    Kayıt Ol
                </Button>

                <p className="text-center mt-3">
                    <a href="/" style={{ color: '#2ecc71', textDecoration: 'none' }}>
                        Giriş sayfasına dön
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
