import axios from 'axios';

const instance = axios.create({
    baseURL : process.env.REACT_APP_FB_STORAGE
});

export default instance;