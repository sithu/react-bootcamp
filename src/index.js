import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { createStore, bindActionCreators, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

import { ColorTool } from './components/color-tool-redux';
import { insert, refresh, deleteColor } from './actions';
import { appStore } from './store';

const ColorToolContainer = connect(
    ({ colors }) => ({ colors }),
    dispatch => bindActionCreators({ refresh, insert, deleteColor }, dispatch)
)(ColorTool);

ReactDOM.render(<Provider store={appStore}>
    <ColorToolContainer />
</Provider>, document.querySelector('main'));

refresh()(appStore.dispatch);