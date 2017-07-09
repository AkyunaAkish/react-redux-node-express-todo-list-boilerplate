import p from 'es6-promise';
p.polyfill();
import axios from 'axios';
import {EDIT_TODO} from '../types';

export default function (id, values, callback) {
    const request = axios.put(`/api/todos/${id}`, values)
                         .then(() => {
                            callback();
                         });

    return {type: EDIT_TODO, payload: request};
};
