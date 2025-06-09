import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        department: '',
        gender: '',
        date: '',
        phone: '',
        is_active: 1
    });
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    const isValidPhone = (phone) => /^\+?[\d\s-]{10,}$/.test(phone);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignUp = async () => {
        const newErrors = {};

        if (!formData.email || !isValidEmail(formData.email)) {
            newErrors.email = 'Geçerli bir e-posta adresi girin.';
        }
        if (!formData.password) {
            newErrors.password = 'Şifre gerekli.';
        }
        if (!formData.name) {
            newErrors.name = 'İsim gerekli.';
        }
        if (!formData.surname) {
            newErrors.surname = 'Soyisim gerekli.';
        }
        if (!formData.department) {
            newErrors.department = 'Departman gerekli.';
        }
        if (!formData.gender) {
            newErrors.gender = 'Cinsiyet gerekli.';
        }
        if (!formData.date) {
            newErrors.date = 'Doğum tarihi gerekli.';
        }
        if (!formData.phone || !isValidPhone(formData.phone)) {
            newErrors.phone = 'Geçerli bir telefon numarası girin.';
        }
        if (!isChecked) {
            newErrors.isChecked = 'Lütfen üyelik sözleşmesini kabul ediniz.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const data = {
            ...formData,
            role: ['user']
        };

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', data);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response?.data?.message) {
                setErrors({ submit: error.response.data.message });
            } else {
                setErrors({ submit: 'Signup failed. Please try again.' });
            }
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
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="E-postanızı giriniz"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Şifre *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Şifre"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">İsim *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="İsminiz"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="surname" className="form-label">Soyisim *</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                        placeholder="Soyisminiz"
                        value={formData.surname}
                        onChange={handleInputChange}
                    />
                    {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="department" className="form-label">Departman *</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                        placeholder="Departmanınız"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                    {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="gender" className="form-label">Cinsiyet *</label>
                    <select
                        id="gender"
                        name="gender"
                        className={`form-control ${errors.gender ? 'is-invalid' : ''}`}
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option value="">Seçiniz</option>
                        <option value="male">Erkek</option>
                        <option value="female">Kadın</option>
                        <option value="other">Diğer</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="date" className="form-label">Doğum Tarihi *</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        value={formData.date}
                        onChange={handleInputChange}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Telefon *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="Telefon numaranız"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
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
