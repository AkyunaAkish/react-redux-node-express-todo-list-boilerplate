import axios from 'axios';
const key = '?key=akyunaakish777';
import {FETCH_POSTS} from '../types';

export default function () {
    const request = axios.get(`https://reduxblog.herokuapp.com/api/posts${key}`);

    return {type: FETCH_POSTS, payload: request};
};
