import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ProgressBar.scss';

export default function ProgressBar(props) {
    const { value, min, max } = props;

    let perc = 0;
    if (max > 0) {
        perc = (value - min) / (max - min);
        perc = Math.max(0, Math.min(perc, 1)) * 100;
    }

    const style = { width: `${perc}%` };
    const labels = [
        props.label ? (
            <span key="label" className={styles.label}>
                {props.label}
            </span>
        ) : null,
        props.maxLabel ? (
            <span key="maxLabel" className={styles.maxLabel}>
                {props.maxLabel}
            </span>
        ) : null,
    ];

    const className = classNames(styles.bar, {
        [styles.segmented]: props.segmented,
    });

    const progressClassName = classNames(styles.progress, {
        [styles[props.type]]: props.type,
    });

    return (
        <div className={className}>
            {props.segmented ? (
                Array.from({ length: props.max }).map((_, i) => {
                    const segmentsClassName = classNames(progressClassName, {
                        [styles.hidden]: i >= value,
                        [styles.highlighted]:
                            props.segmentHighlight && i >= value - props.segmentHighlight,
                    });
                    return <div key={i} className={segmentsClassName} style={style} />;
                })
            ) : (
                <div className={progressClassName} style={style} />
            )}
            {labels}
        </div>
    );
}

ProgressBar.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    label: PropTypes.node,
    maxLabel: PropTypes.node,
    type: PropTypes.string,
    segmented: PropTypes.bool,
    segmentHighlight: PropTypes.number,
};

ProgressBar.defaultProps = {
    value: 0,
    min: 0,
    max: 1,
    label: null,
    maxLabel: null,
    type: 'default',
    segmentHighlight: 0,
};
