import React from 'react';
import PropTypes from 'prop-types';
import { GroupPortraits } from '../common';
import styles from './PlayerGroup.scss';

export default function PlayerGroupContainer(props) {
    return (
        <div className={styles.container}>
            <GroupPortraits
                groupId={props.playerGroupId}
                onSelect={props.onSelect}
                resources
            />
        </div>
    );
}

PlayerGroupContainer.propTypes = {
    playerGroupId: PropTypes.string.isRequired,
    currentAP: PropTypes.number,
    maxAP: PropTypes.number,
    onSelect: PropTypes.func,
};

PlayerGroupContainer.defaultProps = {
    onSelect: () => {},
};
