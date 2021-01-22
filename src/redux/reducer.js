import {
    GET_PAGE
} from './actionTypes';

const initialState = {
    page: null
};

const app = (state = initialState, action) => {
    const { payload } = action;
    let newState;

    switch (action.type) {

    case GET_PAGE:
        newState = {
            currentPage: payload
        };
        break;

    default:
        newState = {};
    }

    state = Object.assign({}, state, newState);
    return state;
};

export default app;
