import React from 'react';
import PropTypes from 'prop-types';
import T from '../../i18n';
import { Panel, ProgressBar, Portrait } from '../';
import styles from './CharacterPortrait.scss';

export default function CharacterPortrait(props) {
    const { character, onClick, progressBar, ...otherProps } = props;
    const { HP, HPMax, level } = character.computed;
    const { basePoints } = character.progress;
    const resourceThreshold = 0.30;

    return (
        <div className={styles.container} onClick={onClick}>
            <div className={styles.inlineContainer}>
                <Panel slim>
                    <div className={styles.wrap} >
                        <div className={styles.innerWrap} >
                            <div className={styles.portrait}>
                                <Portrait resourceId={character.resourceId} {...otherProps} />
                                <span className={styles.level}>{level}</span>
                                {basePoints ? (
                                    <span className={styles.levelUp} />
                                ) : null}
                            </div>
                            {progressBar ? (
                                <ProgressBar
                                    key="HP"
                                    value={HP}
                                    max={HPMax}
                                    label={<T>char.attr.HP</T>}
                                    maxLabel={HP}
                                />
                            ) : null}
                        </div>
                        {props.resources && (
                            <div className={styles.resources}>
                                {['water', 'food', 'energy'].map(key => (
                                    character.condition[key] < resourceThreshold ? (
                                        <span key={key} className={styles[key]} />
                                    ) : null
                                ))}
                            </div>
                        )}
                    </div>
                </Panel>
            </div>
        </div>
    );
}

CharacterPortrait.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        progress: PropTypes.shape(),
        condition: PropTypes.shape(),
        computed: PropTypes.shape(),
        resourceId: PropTypes.string,
    }),
    progressBar: PropTypes.bool,
    large: PropTypes.bool,
    resources: PropTypes.bool,
    onClick: PropTypes.func,
};

CharacterPortrait.defaultProps = {
    character: {},
    onClick: () => {},
};
