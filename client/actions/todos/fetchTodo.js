import axios from 'axios';
import {FETCH_TODO} from '../types';

export default function (id, callback) {
    const request = axios.get(`/api/todos/${id}`)
                         .then((res) => {
                            callback(res);
                            return res;
                         });

    return {type: FETCH_TODO, payload: request};
};
