import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        Authorization: `Bearer ${localStorage.token}`,
    },
});

export default api;
