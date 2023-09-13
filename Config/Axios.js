import axios from 'axios';
import {BaseUrl} from './index'
const instance = axios.create({
    baseURL: BaseUrl,
    timeout: 60000,
});
instance.interceptors.response.use(
    (response) => {
        if (response.data) {
            return response.data;
        } else {
            return { message: 'No data available' };
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default instance;
