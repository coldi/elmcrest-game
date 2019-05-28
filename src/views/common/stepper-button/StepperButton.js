import React from 'react';
import PropTypes from 'prop-types';
import styles from './StepperButton.scss';

export default function StepperButton(props) {
    return (
        <span className={styles.container}>
            <button
                type="button"
                className={styles.btn}
                disabled={props.value <= props.min}
                onClick={props.onDecrease}
            />
            <button
                type="button"
                className={styles.btn}
                disabled={props.value >= props.max}
                onClick={props.onIncrease}
            />
        </span>
    );
}

StepperButton.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onDecrease: PropTypes.func,
    onIncrease: PropTypes.func,
};

StepperButton.defaultProps = {
    value: 0,
    min: -Infinity,
    max: Infinity,
    onDecrease: () => {},
    onIncrease: () => {},
};
