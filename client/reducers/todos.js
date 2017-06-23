import _ from 'lodash';

import {FETCH_TODOS, FETCH_TODO} from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_TODOS:
            return {...state, todos: _.mapKeys(action.payload.data.success, 'id')};
        case FETCH_TODO:
            return {...state, todo: _.cloneDeep(action.payload.data.success)};
        default:
            return state;
    }
};
