import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Compass.scss';

function calcAngle(props, state) {
    const { origin, destination } = props;

    if (origin && destination) {
        const { angle } = state;

        const [x1, y1] = origin;
        const [x2, y2] = destination;
        const radians = Math.atan2(y2 - y1, x2 - x1);
        const nextAngle = (radians * 180) / Math.PI;

        let delta = nextAngle - angle;
        delta = ((delta + 180) % 360) - 180;

        if (delta > 180) {
            delta -= 360;
        } else if (delta < -180) {
            delta += 360;
        }

        return state.angle + delta;
    }

    return state.angle;
}

export default class Compass extends React.Component {
    static propTypes = {
        origin: PropTypes.arrayOf(PropTypes.number),
        destination: PropTypes.arrayOf(PropTypes.number),
        small: PropTypes.bool,
    };

    static defaultProps = {
        origin: null,
        destination: null,
        small: false,
    };

    state = { angle: 0 };

    static getDerivedStateFromProps(nextProps, prevState) {
        const angle = calcAngle(nextProps, prevState);
        return { angle };
    }

    render() {
        const style = { transform: `rotate(${this.state.angle}deg)` };
        const className = classNames(styles.container, {
            [styles.small]: this.props.small,
        });

        return (
            <div className={className}>
                <div className={styles.needle} style={style} />
            </div>
        );
    }
}
