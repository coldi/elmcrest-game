import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getItemStacksList, getUnequippedStacksList } from '../../../modules/inventories';
import { Stack, ContextMenu } from '../';
import styles from './InventoryList.scss';

export class InventoryListContainer extends React.PureComponent {
    static propTypes = {
        inventoryId: PropTypes.string.isRequired,
        stacks: PropTypes.arrayOf(PropTypes.shape()),
        selectedStackId: PropTypes.string,
        showEquip: PropTypes.bool,
        contextMenuList: PropTypes.func,
        onSelect: PropTypes.func,
        onUse: PropTypes.func,
    };

    static defaultProps = {
        showEquip: false,
        onSelect: () => {},
        onUse: () => {},
    };

    state = {};

    element = null;

    constructor(props) {
        super(props);

        this.handleDeselect = this.handleDeselect.bind(this);
        this.renderStack = this.renderStack.bind(this);
    }

    handleDeselect() {
        this.props.onSelect(null);
    }

    renderStack(stack) {
        const { selectedStackId, onSelect, onUse, contextMenuList } = this.props;

        const className = classNames(styles.stackItem, {
            [styles.stackItemActive]: selectedStackId === stack.id,
        });

        const stackElement = <Stack stack={stack} onClick={onSelect} onContext={onUse} />;

        return (
            <li key={stack.id} className={className} onClick={e => e.stopPropagation()}>
                {contextMenuList ? (
                    <ContextMenu render={() => contextMenuList(stack.id)}>
                        {stackElement}
                    </ContextMenu>
                ) : (
                    stackElement
                )}
            </li>
        );
    }

    render() {
        const { stacks } = this.props;

        return (
            <div
                className={styles.container}
                ref={ref => {
                    this.element = ref;
                }}
                onClick={this.handleDeselect}
            >
                <div className={styles.wrap}>
                    <ul className={styles.stackList}>{stacks.map(this.renderStack)}</ul>
                </div>
            </div>
        );
    }
}

export default connect((state, props) => ({
    stacks: props.showEquip
        ? getItemStacksList(state, props.inventoryId)
        : getUnequippedStacksList(state, props.inventoryId),
}))(InventoryListContainer);
