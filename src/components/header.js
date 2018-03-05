import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * Static Component
 * @param {*} props 
 */
export const Header = props => <header>
        <h2>{props.headerText}</h2>
    </header>;

Header.propTypes = {
    headerText: PropTypes.string.isRequired,
}

Header.defaultProps = {
    headerText: 'Default Header',
}