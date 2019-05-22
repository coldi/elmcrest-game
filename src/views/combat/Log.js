import PropTypes from 'prop-types';
import React from 'react';
import { MessageLog } from '../common';
import styles from './Log.scss';

export default function Log(props) {
    return (
        <div className={styles.container}>
            <MessageLog messages={props.messages} />
        </div>
    );
}

Log.propTypes = {
    children: PropTypes.node,
    messages: PropTypes.arrayOf(PropTypes.shape()),
};

Log.defaultProps = {
    messages: [],
};
