import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { createStore, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The Reducer fun must be a pure function. 
 * 1. The only data the pure funciton will receive from parameters.
 * 2. The parameters never be modified without exception.
 * 3. The pure function cannot cause no side effect.
 * 4. The only return output must be the actual pure function.
 * 
 * When you work with redux, the state is always immutable. You will never mutate the state object.
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state={ result: 0, log: [] }, action) => {
    switch (action.type) {
        case 'ADD': 
            return {
                ...state, 
                result: state.result + action.value,
                log: state.log.concat({ op: '+', val: action.value }),
            };
        case 'SUBTRACT':
            return {
                ...state, 
                result: state.result - action.value,
                log: state.log.concat({ op: '-', val: action.value }),
            };
        case 'MULT':
            return {
                ...state, 
                result: state.result * action.value,
                log: state.log.concat({ op: '*', val: action.value }),
            };
        case 'DIV':
            return {
                ...state, 
                result: state.result / action.value,
                log: state.log.concat({ op: '/', val: action.value }),
            };
        case 'DELETE':
        return {
            ...state, 
            log: [],
        };
        default: return state;
    }
};

const store = createStore(reducer);

const createAddAction = value => ({ type: 'ADD', value });
const createSubtractAction = value => ({ type: 'SUBTRACT', value });
const createMultiplyAction = value => ({ type: 'MULT', value });
const createDivAction = value => ({ type: 'DIV', value });
const createDeleteAction = () => ({ type: 'DELETE' });

/*
const bindActionCreators = (actions, dispatch) => {
    const actionFns = {};
    Object.keys(actions).forEach(action => {
        actionFns[action] = value => dispatch(actions[action](value));
    });
    return actionFns;
};
*/
/*
const connect = (mapStateToPropsFn, mapDispatchToPropsFn) => {
    
    return (PresentationalComponent) => {
        
        return class ContainerComponent extends React.Component {
            
            static propTypes = {
                store: PropTypes.shape({
                    dispatch: PropTypes.func.isRequired,
                    getState: PropTypes.func.isRequired,
                    subscribe: PropTypes.func.isRequired,
                }),
            };

            constructor(props) {
                super(props);
                this.dispatchProps = mapDispatchToPropsFn(props.store);
            }

            componentDidMount() {
                this.unsubscribe = this.props.store.subscribe(() => {
                    this.forceUpdate(); // This is the special funciton to re-render the component.
                });
            }

            componentWillUnmount() {
                if(this.unsubscribe) this.unsubscribe();
            }

            render() {
                const stateProps = mapStateToPropsFn(this.props.store.getState());

                return <PresentationalComponent {...this.dispatchProps} {...stateProps} />;
            }

        };

    };

};
*/

class CalculatorTool extends React.Component {
    static propTypes = {
        result: PropTypes.number.isRequired,
        add: PropTypes.func.isRequired,
        subtract: PropTypes.func.isRequired,
        multiply: PropTypes.func.isRequired,
        divide: PropTypes.func.isRequired,
        delete: PropTypes.func.isRequired,
    }

    static defaultProps = {
        result: 0,
    }

    componentDidMount() {
        if (this.numInput) {
            this.numInput.focus();
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div>Result: {this.props.result}</div>
                    <div>
                        <label htmlFor="input">Input:</label>
                        <input name="input" type="number" defaultValue={0} ref={ input => this.numInput = input } />
                    </div>
                    <button type="button" onClick={ () => this.props.add(Number(this.numInput.value)) }>+</button>
                    <button type="button" onClick={ () => this.props.subtract(Number(this.numInput.value)) }>-</button>
                    <button type="button" onClick={ () => this.props.multiply(Number(this.numInput.value)) }>*</button>
                    <button type="button" onClick={ () => this.props.divide(Number(this.numInput.value)) }>/</button>
                </form>
                <br />
                <LogTable log={this.props.log}/>
                <button type="button" onClick={ () => this.props.delete() }>Clear Logs</button>
            </div>
        );
    }
}

class LogTable extends React.Component {
    render() {
        const rows = this.props.log.map( log => {
            return <tr key={log}><td>{log.op}</td><td>{log.val}</td></tr>;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <td>Operator</td><td>Value</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = state => {
    return { result: state.result, log: state.log };
}

const mapDispatchToProps = dispatch => {
    return  bindActionCreators({
        add: createAddAction,
        subtract: createSubtractAction,
        multiply: createMultiplyAction,
        divide: createDivAction,
        delete: createDeleteAction,
    }, dispatch);
}

const createContainer = connect(mapStateToProps, mapDispatchToProps);

const CalculatorToolContainer = createContainer(CalculatorTool);

ReactDOM.render(<CalculatorToolContainer store={store} />, document.querySelector('main'));