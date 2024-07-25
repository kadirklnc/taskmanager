import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignUp = () => {
        const newErrors = {};

        
        if (!email) newErrors.email = true;
        if (!surname) newErrors.surname = true;
        if (!password) newErrors.password = true;
        if (!isChecked) newErrors.isChecked = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        navigate('/homepage'); // Navigate to /homepage if validation passes
    };

    return (
        <div className="container-fluid">
            <div className="card text-black m-5" style={{ borderRadius: '25px' }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
                            <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Kayıt Ol</h1>



                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Ad *</label>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="bi bi-person me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Adınızı Giriniz"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="surname" className="form-label">Soyad *</label>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="bi bi-person me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <input
                                        type="text"
                                        id="surname"
                                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                        placeholder="Soyad"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">E-posta *</label>
                                <div className="d-flex flex-row align-items-center">
                                    <i className="bi bi-envelope me-3" style={{ fontSize: '1.5rem' }}></i>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="E-posta"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
