import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ViewAnchor.scss';

export default function ViewAnchor(props) {
    const { children, align, front } = props;
    const className = classNames(styles.container, styles[align], {
        [styles.front]: front,
    });

    return <div className={className}>{children}</div>;
}

ViewAnchor.propTypes = {
    align: PropTypes.string.isRequired,
    front: PropTypes.bool,
    children: PropTypes.node,
};
