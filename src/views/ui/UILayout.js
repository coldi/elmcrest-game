import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './UILayout.scss';

export default function UILayout(props) {
    const className = classNames(styles.container, {
        [styles.inactive]: !props.active,
        [styles.hidden]: !props.visible,
    });

    return <div className={className}>{props.children}</div>;
}

UILayout.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    visible: PropTypes.bool,
};

UILayout.defaultProps = {
    active: true,
    visible: true,
};
