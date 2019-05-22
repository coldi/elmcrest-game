import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    isBattleActive,
    getCurrentBattle,
    getQueuedEntries,
    getCombatUIState,
    applyRollout,
    makeSelection,
    removeRollout,
    endBattle,
} from '../../modules/combat';
import { getCharacterById } from '../../modules/characters';
import { getLogMessages } from '../../modules/log';
import { Button, CharacterAvatar } from '../common';
import Layout from './Layout';
import Battlefield from './Battlefield';
import Queue from './Queue';
import Log from './Log';
import Group from './Group';
import CharacterHandle from './CharacterHandle';
import CharacterRollout from './CharacterRollout';
import Result from './Result';
import StatusBar from './StatusBar';

class CombatContainer extends React.PureComponent {
    static propTypes = {
        active: PropTypes.bool,
        currentBattle: PropTypes.shape(),
        queue: PropTypes.arrayOf(PropTypes.shape()),
        messages: PropTypes.arrayOf(PropTypes.shape()),
        ui: PropTypes.shape(),
        charactersByGroup: PropTypes.shape(),
        applyRollout: PropTypes.func,
        removeRollout: PropTypes.func,
        makeSelection: PropTypes.func,
        exitBattle: PropTypes.func,
    };

    static defaultProps = {};

    state = {};

    constructor(props) {
        super(props);

        this.handleCharSelection = this.handleCharSelection.bind(this);
        this.handleSkillSelection = this.handleSkillSelection.bind(this);
    }

    get canSelect() {
        const [rollout] = this.props.ui.rollouts;
        const [firstInQueue] = this.props.queue;

        return !rollout && firstInQueue.groupId === this.props.ui.controlledGroupId;
    }

    handleCharSelection(charId) {
        if (this.canSelect) {
            this.props.makeSelection('characterId', charId);
        }
    }

    handleSkillSelection(skillId) {
        if (this.canSelect) {
            this.props.makeSelection('skillId', skillId);
        }
    }

    renderBattle() {
        const { props } = this;

        const [rollout] = props.ui.rollouts;
        const [firstInQueue] = props.queue;
        const characters = Object.values(props.charactersByGroup).reduce(
            (list, chars) => list.concat(chars),
            []
        );
        const activeCharId = rollout ? rollout.originId : firstInQueue.characterId;
        const selectedCharId = rollout
            ? rollout.targetId
            : props.ui.selection.characterId;

        return (
            <Layout>
                <div style={{ position: 'relative', width: '100%', zIndex: 0 }}>
                    {process.env.NODE_ENV === 'development' ? (
                        <Button small onlyText onClick={props.exitBattle}>
                            Exit Combat
                        </Button>
                    ) : null}
                    <Log messages={props.messages} />
                    <Queue
                        entries={props.currentBattle.characters}
                        characters={characters}
                        selectedCharacterId={selectedCharId}
                        onSelect={this.handleCharSelection}
                    />
                </div>
                <Battlefield>
                    {props.currentBattle.groups.map(({ groupId }, index) => (
                        <Group key={groupId} initiator={index === 0}>
                            {props.charactersByGroup[groupId] &&
                                props.charactersByGroup[groupId].map(char => (
                                    <CharacterHandle
                                        key={char.id}
                                        characterId={char.id}
                                        activeCharacterId={activeCharId}
                                        canSelect={this.canSelect}
                                        onCharacter={this.handleCharSelection}
                                        onSkill={this.handleSkillSelection}
                                    >
                                        <CharacterRollout
                                            character={char}
                                            active={char.id === activeCharId}
                                            flip={index !== 0}
                                            rollout={rollout}
                                            onApply={props.applyRollout}
                                            onRemove={props.removeRollout}
                                        >
                                            <CharacterAvatar
                                                character={char}
                                                flip={index !== 0}
                                                interactive={this.canSelect}
                                                selected={char.id === selectedCharId}
                                            />
                                        </CharacterRollout>
                                    </CharacterHandle>
                                ))}
                        </Group>
                    ))}
                </Battlefield>
                <StatusBar
                    leftId={activeCharId}
                    rightId={props.ui.selection.characterId}
                    rollout={rollout}
                />
            </Layout>
        );
    }

    renderResult() {
        const { props } = this;

        return <Result onClose={props.exitBattle} />;
    }

    render() {
        if (this.props.active) {
            return this.renderBattle();
        }

        if (this.props.ui.showResult) {
            return this.renderResult();
        }

        return null;
    }
}

export default connect(
    state => {
        const active = isBattleActive(state);
        const queue = getQueuedEntries(state);
        const messages = getLogMessages(state);
        const currentBattle = getCurrentBattle(state);
        const ui = getCombatUIState(state);
        const charactersByGroup = currentBattle.characters.reduce(
            (obj, { groupId, characterId }) => {
                // eslint-disable-next-line  no-param-reassign
                obj[groupId] = obj[groupId] || [];

                obj[groupId].push(getCharacterById(state, characterId));
                return obj;
            },
            {}
        );

        return {
            active,
            currentBattle,
            queue,
            messages,
            ui,
            charactersByGroup,
        };
    },
    dispatch => ({
        exitBattle: () => dispatch(endBattle(true)),
        applyRollout: () => dispatch(applyRollout()),
        removeRollout: () => dispatch(removeRollout()),
        makeSelection: (key, id) => dispatch(makeSelection(key, id)),
    })
)(CombatContainer);
