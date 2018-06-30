import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Heading.scss';

export default function Heading(props) {
    let tag = 'h2';
    if (props.minor) { tag = 'h3'; }
    if (props.sub) { tag = 'h4'; }

    const className = classNames(
        styles.heading,
        {
            [styles.minor]: props.minor,
            [styles.sub]: props.sub,
        }
    );

    return (
        React.createElement(tag, { className }, props.children)
    );
}

Heading.propTypes = {
    children: PropTypes.node.isRequired,
    minor: PropTypes.bool,
    sub: PropTypes.bool,
};

Heading.defaultProps = {
    minor: false,
    sub: false,
};
