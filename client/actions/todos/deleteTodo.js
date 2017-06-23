import axios from 'axios';
import {DELETE_TODO} from '../types';

export default function (id, callback) {
    const request = axios.delete(`/api/todos/${id}`)
                         .then(() => {
                            callback();
                         });

    return {type: DELETE_TODO, payload: request};
};
