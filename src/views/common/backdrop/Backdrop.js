import React from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.scss';

export default function Backdrop(props) {
    return (
        <div
            className={styles.container}
            onClick={props.onClick}
        />
    );
}

Backdrop.propTypes = {
    onClick: PropTypes.func,
};

Backdrop.defaultProps = {
    onClick: () => {},
};
