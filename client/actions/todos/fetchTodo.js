import axios from 'axios';
import {FETCH_TODO} from '../types';

export default function (id) {
    const request = axios.get(`/api/todos/${id}`);

    return {type: FETCH_TODO, payload: request};
};
