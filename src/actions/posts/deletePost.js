import axios from 'axios';
const key = '?key=akyunaakish777';
import {DELETE_POST} from '../types';

export default function (id, callback) {
    const request = axios.delete(`https://reduxblog.herokuapp.com/api/posts/${id}${key}`)
                         .then(() => {
                            callback();
                         });
                         
    // can return id instead of request since reducer
    // does not depend on returned value of request
    return {type: DELETE_POST, payload: request};
};
