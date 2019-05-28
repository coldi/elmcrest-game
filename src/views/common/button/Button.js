import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Button.scss';

export default function Button(props) {
    const className = classNames(styles.button, {
        [styles.active]: props.active,
        [styles.small]: props.small,
        [styles.large]: props.large,
        [styles.danger]: props.danger,
        [styles.disabled]: props.disabled,
        [styles.onlyText]: props.onlyText,
        [styles.block]: props.block,
        [styles.highlight]: props.highlight,
    });

    return (
        <button
            type="button"
            className={className}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    active: PropTypes.bool,
    danger: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    onlyText: PropTypes.bool,
    block: PropTypes.bool,
    highlight: PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => {},
};
