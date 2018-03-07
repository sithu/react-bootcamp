import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = (state = { cars: [] }, action) => {
    switch(action.type) {
        case 'REFRESH_DONE': return { ...state, cars: action.cars };
        default: return state;
    }
};

export const appStore = createStore(reducer, applyMiddleware(thunk));
