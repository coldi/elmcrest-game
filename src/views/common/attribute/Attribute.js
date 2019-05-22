import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Attribute.scss';

/**
 * Determines whether the modified value is an enhancement
 * compared to the base value.
 * @param {number} base
 * @param {number} modified
 * @returns {boolean}
 */
const determineModification = (base, modified) => {
    if (modified === null) {
        return null;
    }

    if (modified > base) {
        return true;
    }

    if (modified < base) {
        return false;
    }

    return null;
};

const formatNumber = (value, isPercent) => {
    const num = Number(value);

    if (isPercent) {
        // percentage
        return Math.round(num.toFixed(2) * 100);
    }

    if (num % 1 === 0) {
        // integer
        return num;
    }

    // float
    if (num < 10) {
        return num.toFixed(1);
    }

    return Math.round(num);
};

export default function Attribute(props) {
    const enhanced = determineModification(props.base, props.modified);

    const containerClassName = classNames({
        [styles.container]: !props.inline,
        [styles.inline]: props.inline,
        [styles.percent]: props.percent,
    });

    const modifiedClassName = classNames(styles.modified, {
        [styles.hidden]: enhanced === null && props.base !== null,
        [styles.better]: enhanced === true,
        [styles.even]: enhanced === null,
        [styles.worse]: enhanced === false,
    });

    const labelElement = props.children ? (
        <span className={styles.label}>{props.children}</span>
    ) : null;

    // by default show base and modified values
    let valuesElement = (
        <span>
            <span className={styles.base}>{formatNumber(props.base, props.percent)}</span>
            <span className={modifiedClassName}>
                {formatNumber(props.modified, props.percent)}
            </span>
        </span>
    );

    if (props.base === null) {
        // show only modification with +/- prefix if base is not set
        let prefix = '';
        if (enhanced === true) {
            prefix = '+';
        } else if (enhanced === false) {
            // prefix = '-';
        }

        valuesElement = (
            <span className={modifiedClassName}>
                {prefix}
                {formatNumber(props.modified, props.percent)}
            </span>
        );
    }

    return (
        <div className={containerClassName}>
            {labelElement}
            <span className={styles.values}>{valuesElement}</span>
        </div>
    );
}

Attribute.propTypes = {
    base: PropTypes.number,
    modified: PropTypes.number,
    children: PropTypes.node,
    inline: PropTypes.bool,
    percent: PropTypes.bool,
};

Attribute.defaultProps = {
    base: null,
    modified: null,
    children: null,
    inline: false,
    percent: false,
};
