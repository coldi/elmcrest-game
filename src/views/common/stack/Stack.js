import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPopulatedStack } from '../../../modules/inventories';
import { Item } from '../';
import styles from './Stack.scss';

function Stack(props) {
    const { stack, onClick, onContext } = props;

    const amount =
        stack.amount > 1 ? <span className={styles.amount}>{stack.amount}</span> : null;

    return (
        <div
            className={styles.container}
            onClick={() => onClick(stack.id)}
            onContextMenu={() => onContext(stack.id)}
        >
            <Item item={stack.item} />
            {amount}
        </div>
    );
}

Stack.propTypes = {
    stack: PropTypes.shape().isRequired,
    onClick: PropTypes.func,
    onContext: PropTypes.func,
};

Stack.defaultProps = {
    onClick: () => {},
    onContext: () => {},
};

export default connect((state, props) => ({
    stack: props.stack.item.itemType
        ? props.stack
        : getPopulatedStack(state, props.stack),
}))(Stack);
