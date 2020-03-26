import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://192.168.0.18:3333',    
});

export default Api;