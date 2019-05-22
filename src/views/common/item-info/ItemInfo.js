import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import T from '../../i18n';
import { Attribute, Block, Effect, Heading } from '../';
import styles from './ItemInfo.scss';

export default function ItemInfo(props) {
    const { itemType, qualityId } = props.item;
    const effects = props.item.effects.map((effect, index) => (
        <Effect key={`${effect.name}-${index}`} effect={effect} />
    ));
    const className = classNames(
        styles.container,
        Object.keys(styles).reduce(
            (obj, key) => (qualityId === key ? { ...obj, [styles[key]]: true } : obj),
            {}
        )
    );

    const [prefix] = props.item.prefixes || [];
    const [suffix] = props.item.suffixes || [];

    return (
        <div className={className}>
            <div className={styles.title}>
                <Heading minor>
                    {prefix && <T>affixes.prefixes.{prefix}</T>}
                    <T>items.{itemType.id}.name</T>
                    {suffix && <T>affixes.suffixes.{suffix}</T>}
                </Heading>
            </div>
            {qualityId && qualityId !== 'normal' && (
                <div className={styles.quality}>
                    <T>qualities.{qualityId}</T>
                </div>
            )}
            <div className={styles.description}>
                <T>items.{itemType.id}.descr</T>
            </div>
            <div className={styles.effects}>{effects}</div>
            <div className={styles.meta}>
                <Attribute base={props.item.level}>
                    <T>common.level</T>
                </Attribute>
                <Attribute base={itemType.size}>
                    <T>common.itemSize</T>
                </Attribute>
                <Block noGap>
                    {itemType.slot && <T>common.wearableItem</T>}
                    {itemType.consumable && <T>common.consumableItem</T>}
                </Block>
            </div>
        </div>
    );
}

ItemInfo.propTypes = {
    item: PropTypes.shape().isRequired,
};
