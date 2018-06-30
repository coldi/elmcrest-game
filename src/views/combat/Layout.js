import PropTypes from 'prop-types';
import React from 'react';
import styles from './Layout.scss';

export default function Layout (props) {
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
};
