const print = console.log;

// 'state' a.k.a accumulator is the return value.
const reducer = (state=0, action) => {
    switch (action.type) {
        case 'ADD': return state + action.value;
        case 'SUBTRACT': return state - action.value;
        default: return state;
    }
};

const createStore = (reducer) => {

    let currentState = undefined;
    const subcriptions = [];

    return {
        getState: () => currentState,
        dispatch: action => {
            currentState = reducer(currentState, action);
            subcriptions.forEach(fn => fn());
        },
        subscribe: fn => subcriptions.push(fn),
    };
};

const store = createStore(reducer);

store.subscribe( () => {
    print(store.getState());
});

store.dispatch({ type: 'ADD', value: 1 });
store.dispatch({ type: 'SUBTRACT', value: 2 });
store.dispatch({ type: 'ADD', value: 3 });
store.dispatch({ type: 'SUBTRACT', value: 4 });
store.dispatch({ type: 'ADD', value: 5 });
