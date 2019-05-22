import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import T from '../../i18n';
import { Block, Grid, ProgressBar } from '../';
import { getCharacterById, getExpByLevel } from '../../../modules/characters';

function CharacterBars(props) {
    return (
        <Block>
            {props.exp ? (
                <Block>
                    <ProgressBar
                        label={<T>char.attr.exp</T>}
                        maxLabel={`${props.currentLevelExp} / ${props.nextLevelExp}`}
                        value={props.currentLevelExp}
                        max={props.nextLevelExp}
                    />
                </Block>
            ) : null}
            {props.HP || props.AP ? (
                <Grid noWrap consistent>
                    {props.HP ? (
                        <Grid.Item>
                            <ProgressBar
                                label={<T>char.attr.HP</T>}
                                maxLabel={`${props.character.computed.HP} / ${
                                    props.character.computed.HPMax
                                }`}
                                value={props.character.computed.HP}
                                max={props.character.computed.HPMax}
                            />
                        </Grid.Item>
                    ) : null}
                    {props.AP ? (
                        <Grid.Item>
                            <ProgressBar
                                label={<T>char.attr.AP</T>}
                                maxLabel={`${props.character.computed.AP} / ${
                                    props.character.computed.APMax
                                }`}
                                value={props.character.computed.AP}
                                max={props.character.computed.APMax}
                                segmented
                            />
                        </Grid.Item>
                    ) : null}
                </Grid>
            ) : null}
            {props.resources ? (
                <Grid noWrap consistent>
                    <Grid.Item>
                        <ProgressBar
                            type="water"
                            label={<T>char.attr.water</T>}
                            maxLabel={`${Math.round(
                                props.character.condition.water * 100
                            )}%`}
                            value={props.character.condition.water}
                        />
                    </Grid.Item>
                    <Grid.Item>
                        <ProgressBar
                            type="food"
                            label={<T>char.attr.food</T>}
                            maxLabel={`${Math.round(
                                props.character.condition.food * 100
                            )}%`}
                            value={props.character.condition.food}
                        />
                    </Grid.Item>
                    <Grid.Item>
                        <ProgressBar
                            type="energy"
                            label={<T>char.attr.energy</T>}
                            maxLabel={`${Math.round(
                                props.character.condition.energy * 100
                            )}%`}
                            value={props.character.condition.energy}
                        />
                    </Grid.Item>
                </Grid>
            ) : null}
        </Block>
    );
}

CharacterBars.propTypes = {
    character: PropTypes.shape(),
    currentLevelExp: PropTypes.number,
    nextLevelExp: PropTypes.number,
    exp: PropTypes.bool,
    HP: PropTypes.bool,
    AP: PropTypes.bool,
    resources: PropTypes.bool,
};

export default connect((state, props) => {
    const character = getCharacterById(state, props.characterId);
    const currentLevelExp =
        character.progress.exp - getExpByLevel(state, character.computed.level);
    const nextLevelExp =
        getExpByLevel(state, character.computed.level + 1) -
        getExpByLevel(state, character.computed.level);

    return {
        character,
        currentLevelExp,
        nextLevelExp,
    };
})(CharacterBars);
