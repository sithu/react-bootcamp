import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state = { colors: [] }, action) => {
    switch(action.type) {
        case 'REFRESH_DONE': return { ...state, colors: action.colors };
        default: return state;
    }
};

export const appStore = createStore(reducer, applyMiddleware(thunk));
