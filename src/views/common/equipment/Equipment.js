import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getEquippedItemsOfCharacter } from '../../../modules/characters';
import T from '../../i18n';
import { Item } from '../';
import styles from './Equipment.scss';

export class EquipmentContainer extends React.PureComponent {
    static propTypes = {
        characterId: PropTypes.string.isRequired,
        items: PropTypes.shape(),
        onUnequip: PropTypes.func,
    };

    static defaultProps = {
        onUnequip: () => {},
    };

    state = {};

    constructor(props) {
        super(props);

        this.renderSlot = this.renderSlot.bind(this);
    }

    handleUnequip(itemSlot) {
        if (itemSlot) this.props.onUnequip(itemSlot.stackId);
    }

    renderSlot(slot) {
        const itemSlot = this.props.items[slot];

        const className = classNames(styles.slot, { [styles.clickable]: itemSlot });

        return (
            <li
                key={slot}
                className={className}
                onClick={() => this.handleUnequip(itemSlot)}
                onContextMenu={() => this.handleUnequip(itemSlot)}
            >
                {itemSlot ? (
                    <Item item={itemSlot} />
                ) : (
                    <T className={styles.slotLabel}>char.equip.{slot}</T>
                )}
            </li>
        );
    }

    render() {
        const { items } = this.props;

        return (
            <div className={styles.container}>
                <ul className={styles.slots}>
                    {Object.keys(items).map(this.renderSlot)}
                </ul>
            </div>
        );
    }
}

export default connect((state, props) => ({
    items: getEquippedItemsOfCharacter(state, props.characterId),
}))(EquipmentContainer);
