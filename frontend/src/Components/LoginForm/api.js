import axios from 'axios';

// Axios instance oluşturdum
const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// Request interceptor ile her isteğe token ekledim
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;


