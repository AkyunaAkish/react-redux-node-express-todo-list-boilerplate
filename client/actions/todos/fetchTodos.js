import p from 'es6-promise';
p.polyfill();
import axios from 'axios';
import {FETCH_TODOS} from '../types';

export default function () {
    const request = axios.get(`/api/todos`);

    return {type: FETCH_TODOS, payload: request};
};
