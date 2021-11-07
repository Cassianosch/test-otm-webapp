import axios from 'axios';

const baseURL = 'https://test-otm-api.herokuapp.com/api';

const api = axios.create({
    baseURL,
});

export default api;
