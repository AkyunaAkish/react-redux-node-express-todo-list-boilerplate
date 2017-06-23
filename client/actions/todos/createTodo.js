import axios from 'axios';
import {CREATE_TODO} from '../types';

export default function (values, callback) {
    const request = axios.post(`/api/todos`, values)
                            .then(() => {
                                callback();  
                            });

    return {type: CREATE_TODO, payload: request};
};
