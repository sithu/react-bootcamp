import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';

const print = console.log;

// 'state' a.k.a accumulator is the return value.
const reducer = (state=0, action) => {
    switch (action.type) {
        case 'ADD': return state + action.value;
        case 'SUBTRACT': return state - action.value;
        case 'MULT': return state * action.value;
        case 'DIV': return state / action.value;
        default: return state;
    }
};

// const createStore = (reducer) => {

//     let currentState = undefined;
//     const subcriptions = [];

//     return {
//         getState: () => currentState,
//         dispatch: action => {
//             currentState = reducer(currentState, action);
//             subcriptions.forEach(fn => fn());
//         },
//         subscribe: fn => subcriptions.push(fn),
//     };
// };

const store = createStore(reducer);

const createAddAction = value => ({ type: 'ADD', value });
const createSubtractAction = value => ({ type: 'SUBTRACT', value });
const createMultiplyAction = value => ({ type: 'MULT', value });
const createDivAction = value => ({ type: 'DIV', value });



// const add = value => store.dispatch(createAddAction(value));
// const subtract = value => store.dispatch(createSubtractAction(value));
// OR
// const bindActionCreators = (actions, dispatch) => {
//     const actionFns = {};
//     Object.keys(actions).forEach(action => {
//         actionFns[action] = value => dispatch(actions[action](value));
//     });
//     return actionFns;
// };

const { add, subtract, mult, divide } = bindActionCreators({
    add: createAddAction,
    subtract: createSubtractAction,
    mult: createMultiplyAction,
    divide: createDivAction,
}, store.dispatch);

// add(1);
// add(2);
// print(store.getState());

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: 0,
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
        });
    }
        
    render() {
        return (
            <div>
            <div>
            <label htmlFor="result">Result: {this.props.result}</label>
            </div>
            <div>
            <label htmlFor="input">Input: </label>
            <input name="input" type="number" value={this.state.input} onChange={this.onChange} />
            </div>
            <div>
                <button type="button" onClick={ () => this.props.add(this.state.input) } >+</button>
                <button type="button" onClick={ () => this.props.subtract(this.state.input) } >-</button>
                <button type="button" onClick={ () => this.props.mult(this.state.input) } >*</button>
                <button type="button" onClick={ () => this.props.divide(this.state.input) } >/</button>
            </div>
            </div>
        );
    }
}


ReactDOM.render(<Calculator result={store.getState()} add={add} subtract={subtract} mult={mult} divide={divide} />, document.querySelector('main'));

store.subscribe( () => {
    ReactDOM.render(<Calculator result={store.getState()} add={add} subtract={subtract} mult={mult} divide={divide} />, document.querySelector('main'));
});

add(0);