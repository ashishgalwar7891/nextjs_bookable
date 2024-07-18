import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://dev-admin.bookablebiz.website/',
    //baseURL: 'http://localhost/bookablebiz-admin/',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        'Access-token': 'QWERTYUIOP123',
       ' Access-Control-Allow-Origin': '*'
    },
});

Axios.interceptors.request.use(
    async function (config) {
        const getToken = localStorage.getItem('token');
        const token = getToken;

        if (token) {
        config.headers['token'] = token;
        }

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log('Axios Error -->>', error);
        if (error.response.status == 401 || error.response.status == 403) {
        // localStorage.clear();
        // window.location.replace('/login');
        }
        return Promise.reject(error);
    }
);

export default Axios;