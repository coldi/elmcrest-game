import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image, ItemInfo, Tooltip } from '../';
import styles from './Item.scss';

export default function Item(props) {
    const { qualityId } = props.item;
    const wrapClassName = classNames(
        styles.wrap,
        Object.keys(styles).reduce((obj, key) => (
            qualityId === key ? { ...obj, [styles[key]]: true } : obj
        ), {})
    );

    const imgSrc = `items/${props.item.itemType.resourceId}.png`;

    return (
        <div className={styles.container}>
            <Tooltip>
                <Tooltip.Content>
                    <ItemInfo item={props.item} />
                </Tooltip.Content>
                <div className={wrapClassName}>
                    <Image src={imgSrc} />
                </div>
            </Tooltip>
        </div>
    );
}

Item.propTypes = {
    item: PropTypes.shape().isRequired,
};

Item.defaultProps = {
    onClick: () => {},
};
