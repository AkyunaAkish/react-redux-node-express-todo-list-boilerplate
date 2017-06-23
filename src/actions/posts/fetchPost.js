import axios from 'axios';
const key = '?key=akyunaakish777';
import {FETCH_POST} from '../types';

export default function (id) {
    const request = axios.get(`https://reduxblog.herokuapp.com/api/posts/${id}${key}`);

    return {type: FETCH_POST, payload: request};
};
