import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '../';
import styles from './Portrait.scss';

export default function Portrait(props) {
    // `props.resourceId` can be null, therefore set a default like so:
    const resourceId = props.resourceId || 'placeholder';
    const src = `characters/${resourceId}/portrait.png`;

    let size = '4.5em';
    size = props.large ? '6.5em' : size;
    size = props.small ? '3em' : size;

    return (
        <div className={styles.container} onClick={props.onClick}>
            <Image src={src} width={size} height={size} />
        </div>
    );
}

Portrait.propTypes = {
    resourceId: PropTypes.string,
    small: PropTypes.bool,
    large: PropTypes.bool,
    onClick: PropTypes.func,
};

Portrait.defaultProps = {
    onClick: () => {},
};
