import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

import { CarTool } from './components/car-tool-redux';
import { insert, refresh, update, deleteCar } from './car-actions';
import { appStore } from './car-store';

const CarToolContainer = connect(
    ({ cars }) => ({ cars }),
    dispatch => bindActionCreators({ refresh, insert, update, deleteCar }, dispatch)
)(CarTool);

ReactDOM.render(<Provider store={appStore}>
    <CarToolContainer />
</Provider>, document.querySelector('main'))

refresh()(appStore.dispatch);