import PropTypes from 'prop-types';
import React from 'react';
import styles from './Battlefield.scss';

export default function Battlefield(props) {
    return (
        <div className={styles.container}>
            <div className={styles.ground} />
            <div className={styles.groups}>{props.children}</div>
        </div>
    );
}

Battlefield.propTypes = {
    children: PropTypes.node,
};

Battlefield.defaultProps = {};
