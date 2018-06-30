import React from 'react';
import PropTypes from 'prop-types';
import T from '../i18n';
import { Button } from '../common';
import styles from './Actions.scss';

export default function Actions({
    eventId,
    actions,
    onSelect,
}) {
    const handleClick = (action) => {
        onSelect(action.id);
        action.resolve();
    };

    return (
        <div className={styles.container}>
            {actions.reduce((list, action, index) => {
                if (action.visible === false) {
                    return list;
                }

                return [
                    ...list,
                    <Button
                        key={`${action.id}-${index}`}
                        block
                        disabled={action.condition === false}
                        onClick={() => handleClick(action)}
                    >
                        <T params={action.params}>
                            events.{eventId}.{action.id}
                        </T>
                    </Button>
                ];
            }, [])}
        </div>
    );
}

Actions.propTypes = {
    eventId: PropTypes.string,
    sceneId: PropTypes.string,
    actions: PropTypes.arrayOf(PropTypes.shape()),
    onSelect: PropTypes.func,
};

Actions.defaultProps = {
    onSelect: () => {},
};
