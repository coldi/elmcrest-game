import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Grid.scss';

const Item = props => {
    const className = classNames(styles.col, {
        [styles.growWidth]: props.growWidth,
        [styles.growHeight]: props.growHeight,
    });

    return <div className={className}>{props.children}</div>;
};

Item.propTypes = {
    children: PropTypes.node,
    growWidth: PropTypes.bool,
    growHeight: PropTypes.bool,
};

export default function Grid(props) {
    const className = classNames(styles.container, {
        [styles.noGap]: props.noGap,
        [styles.smallGap]: props.smallGap,
        [styles.noWrap]: props.noWrap,
        [styles.column]: props.column,
        [styles.consistent]: props.consistent,
    });

    const style = { width: props.width };

    return (
        <div className={className} style={style}>
            {props.children}
        </div>
    );
}

Grid.Item = Item;

Grid.propTypes = {
    children: PropTypes.node,
    noGap: PropTypes.bool,
    smallGap: PropTypes.bool,
    noWrap: PropTypes.bool,
    column: PropTypes.bool,
    consistent: PropTypes.bool,
    width: PropTypes.string,
};

Grid.defaultProps = {
    noGap: false,
    smallGap: false,
    noWrap: false,
    column: false,
    consistent: false,
    width: 'auto',
};
