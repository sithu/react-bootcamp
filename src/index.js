import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';
import thunk from 'redux-thunk';

const reducer = (state = { colors: [] }, action) => {
    switch(action.type) {
        case 'REFRESH_DONE': return { ...state, colors: action.colors };
        default: return state;
    }
};

const appStore= createStore(reducer, applyMiddleware(thunk));

const createRefreshRequestAction = () => ({
    type: 'REFRESH_REQUEST',
});

const createRefreshDoneAction = colors => ({
    type: 'REFRESH_DONE',
    colors,
});

const refresh = () => {
    return dispatch => {
        dispatch(createRefreshRequestAction());
        return fetch('http://localhost:4000/colors')
            .then(res => res.json())
            .then(colors => dispatch(createRefreshDoneAction(colors)));
    }
}

const createDeleteRequestAction = () => ({
    type: 'DELETE_REQUEST',
});

const deleteColor = (id) => {
    return dispatch => {
        dispatch(createDeleteRequestAction());
        return fetch('http://localhost:4000/colors/' + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }})
            .then(() => refresh()(dispatch));
    }
}

const createInsertRequestAction = () => ({
    type: 'INSERT_REQUEST',
});

const createInsertDoneAction = color => ({
    type: 'INSERT_DONE',
    color,
});

const insert = color => {

    return dispatch => {
        dispatch(createInsertRequestAction(color))

        return fetch('http://localhost:4000/colors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(color)
            })
            .then(() => refresh()(dispatch));
    };
}

const ColorList = props => {
    return props.colors.map( c => { 
        return <li key={c.id}>{c.name}<button type="button" onClick={ () => props.deleteColor(c.id) } >Delete</button></li>
    });
};

const ColorTool = props => <div>
    <ColorList colors={props.colors} deleteColor={props.deleteColor} />
    <button type="button" onClick={ () => props.refresh() }>Refresh</button>
    <form>
        <div>Name: <input type="text" defaultValue="" ref={i => this.n = i} /></div>
        <div>HexCode: <input type="color" defaultValue="#000000" ref={i => this.h = i} /></div>
        <button type="button" onClick={ 
            () => props.insert({name: this.n.value, hexCode: this.h.value})
            }>Add Color</button>
    </form>
</div>

const ColorToolContainer = connect(
    ({ colors }) => ({ colors }),
    dispatch => bindActionCreators({ refresh, insert, deleteColor }, dispatch)
)(ColorTool);

ReactDOM.render(<Provider store={appStore}>
    <ColorToolContainer />
</Provider>, document.querySelector('main'));

refresh()(appStore.dispatch);