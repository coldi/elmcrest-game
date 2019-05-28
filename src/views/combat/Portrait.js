import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getCharacterById } from '../../modules/characters';
import T from '../i18n';
import {
    Block,
    Heading,
    CharacterPortrait,
    ProgressBar,
    Tooltip,
    CharacterStats,
} from '../common';
import styles from './Portrait.scss';

function Portrait(props) {
    const className = classNames(styles.container, {
        [styles.left]: props.left,
        [styles.right]: props.right,
    });

    return (
        <Tooltip>
            <Tooltip.Content>
                <Heading sub>
                    <T>common.attributes</T>
                </Heading>
                <CharacterStats characterId={props.characterId} />
            </Tooltip.Content>
            <div key={props.characterId} className={className}>
                <div className={styles.img}>
                    <CharacterPortrait character={props.character} />
                </div>
                <div className={styles.content}>
                    <Block>
                        <Heading minor>{props.character.name}</Heading>
                        <ProgressBar
                            value={props.character.computed.HP}
                            max={props.character.computed.HPMax}
                            label={<T>char.attr.HP</T>}
                            maxLabel={props.character.computed.HP}
                        />
                    </Block>
                </div>
            </div>
        </Tooltip>
    );
}

Portrait.propTypes = {
    characterId: PropTypes.string.isRequired,
    children: PropTypes.node,
    character: PropTypes.shape(),
    left: PropTypes.bool,
    right: PropTypes.bool,
};

export default connect((state, props) => ({
    character: getCharacterById(state, props.characterId),
}))(Portrait);
