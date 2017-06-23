import _ from 'lodash';

import {FETCH_POSTS, FETCH_POST} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {...state, posts: _.mapKeys(action.payload.data, 'id')};
        case FETCH_POST:
            return {...state, post: _.cloneDeep(action.payload.data)};
        default:
            return state;
    }
};
