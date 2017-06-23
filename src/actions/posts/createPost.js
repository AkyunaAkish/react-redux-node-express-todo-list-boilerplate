import axios from 'axios';
const key = '?key=akyunaakish777';
import {CREATE_POST} from '../types';

export default function (values, callback) {
    const request = axios.post(`https://reduxblog.herokuapp.com/api/posts${key}`, values)
                            .then(() => {
                                callback();  
                            });

    return {type: CREATE_POST, payload: request};
};
