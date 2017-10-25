import _ from 'lodash';

import { FETCH_TODOS, FETCH_TODO } from '../actions/types';

let initialState = { 
    todos: [], 
    todo: { 
        id: null, 
        content: '' 
    } 
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TODOS:
            return { ...state, todos: _.mapKeys(action.payload.data.success, 'id') };
        case FETCH_TODO:
            let hasData = action.payload.data;
            let hasSuccess = action.payload.data.success;
            return { ...state, todo:  hasData && hasSuccess ? _.cloneDeep(action.payload.data.success) : { id: null, content: '' } };
        default:
            return state;
    }
}
