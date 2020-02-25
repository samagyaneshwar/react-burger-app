import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-fbed8.firebaseio.com/'
});

export default instance;