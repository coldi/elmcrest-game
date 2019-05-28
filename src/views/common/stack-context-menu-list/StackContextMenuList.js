import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStackById } from '../../../modules/inventories';
import { getItemTypeById } from '../../../modules/items';
import T from '../../i18n';
import { ContextMenu } from '../';

export class StackContextMenuList extends React.PureComponent {
    static propTypes = {
        inventoryId: PropTypes.string.isRequired,
        stackId: PropTypes.string.isRequired,
        stack: PropTypes.shape(),
        itemType: PropTypes.shape(),
        onUse: PropTypes.func,
        onDrop: PropTypes.func,
    };

    static defaultProps = {
        onUse: () => {},
        onDrop: () => {},
    };

    state = {};

    render() {
        const { props } = this;
        const { slot, consumable } = props.itemType;

        return (
            <ContextMenu.List>
                {slot && (
                    <ContextMenu.Item onClick={props.onUse}>
                        <T>ui.equipItem</T>
                    </ContextMenu.Item>
                )}
                {consumable && (
                    <ContextMenu.Item onClick={props.onUse}>
                        <T>ui.consumeItem</T>
                    </ContextMenu.Item>
                )}
                <ContextMenu.Item onClick={props.onDrop}>
                    <T params={{ amount: props.stack.amount }}>ui.dropItem</T>
                </ContextMenu.Item>
            </ContextMenu.List>
        );
    }
}

export default connect((state, props) => {
    const stack = getStackById(state, props.inventoryId, props.stackId);
    const itemType = getItemTypeById(state, stack.item.itemTypeId);

    return { stack, itemType };
})(StackContextMenuList);
