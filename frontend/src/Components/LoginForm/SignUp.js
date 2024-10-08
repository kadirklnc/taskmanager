import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignUp = async () => {
        const newErrors = {};

        if (!email) newErrors.email = true;
        if (!username) newErrors.username = true;
        if (!password) newErrors.password = true;
        if (!isChecked) newErrors.isChecked = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            email,
            username,
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
        <div className="container-fluid">
            <div className="card text-black m-5" style={{ borderRadius: '25px' }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
                            <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Kayıt Ol</h1>


                            <div className="mb-4">
                                <label htmlFor="username" className="form-label">E-posta *</label>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="bi bi-envelope me-3"
                                        style={{ fontSize: '1.5rem' }}></i>
                                    <input
                                        type="text"
                                        id="username"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        placeholder="E-postanızı giriniz"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>






                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Şifre *</label>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="bi bi-key me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <input
                                        type="password"
                                        id="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Şifre"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="checkbox"
                                    id="subscribeNewsletter"
                                    checked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                />
                                <label htmlFor="subscribeNewsletter" className="ms-2">Üyelik Sözleşmesi’ni okudum ve kabul ediyorum.</label>
                            </div>

                            {errors.submit && (
                                <p className="errorMessage" style={{ color: 'red', marginTop: '10px' }}>
                                    {errors.submit}
                                </p>
                            )}

                            <Button variant="success" className='customButtonGiris' onClick={handleSignUp}>
                                Kayıt Ol
                            </Button>
                        </div>

                        <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sign up illustration" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
