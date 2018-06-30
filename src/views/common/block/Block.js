import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Block.scss';

export default function Block(props) {
    const className = classNames(
        styles.block,
        { [styles.noGap]: props.noGap }
    );

    return <div className={className}>{props.children}</div>;
}

Block.propTypes = {
    children: PropTypes.node,
    noGap: PropTypes.bool,
};

Block.defaultProps = {
    children: null,
    noGap: false,
};
