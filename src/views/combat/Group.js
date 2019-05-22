import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './Group.scss';

export default function Group(props) {
    const className = classNames(styles.container, {
        [styles.left]: props.initiator,
        [styles.right]: !props.initiator,
    });

    return <div className={className}>{props.children}</div>;
}

Group.propTypes = {
    initiator: PropTypes.bool.isRequired,
    children: PropTypes.node,
};
