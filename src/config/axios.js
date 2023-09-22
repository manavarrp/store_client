import axios from "axios";

const clientAxios = axios.create({
    baseURL: 'http://localhost:5001'
});

// Agrega un interceptor para incluir el token en el encabezado
clientAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Obtén el token de localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default clientAxios;
