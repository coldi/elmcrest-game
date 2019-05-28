import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroupById } from '../../../modules/groups';
import { getCharacterById } from '../../../modules/characters';
import { SKILLS_WINDOW, getGeneralUIState, toggleWindow } from '../../../modules/ui';
import { CharacterSelection, Panel, SkillTree, Window } from '../../common';
import T from '../../i18n';

export class SkillsContainer extends React.Component {
    static propTypes = {
        groupId: PropTypes.string.isRequired,
        group: PropTypes.shape(),
        character: PropTypes.shape(),
        closeWindow: PropTypes.func,
    };

    static defaultProps = {};

    state = {};

    render() {
        const { props } = this;

        return (
            <Window onClose={this.props.closeWindow}>
                <Panel title={<T>ui.windows.skills.title</T>}>
                    <CharacterSelection characterIds={props.group.characterIds}>
                        {() => (
                            <SkillTree
                                key={props.character.id}
                                characterId={props.character.id}
                            />
                        )}
                    </CharacterSelection>
                </Panel>
            </Window>
        );
    }
}

export default connect(
    (state, props) => {
        const { selectedCharacterId } = getGeneralUIState(state);
        const group = getGroupById(state, props.groupId);
        const charId = selectedCharacterId || group.characterIds[0];
        const character = getCharacterById(state, charId);

        return {
            group,
            character,
        };
    },
    dispatch => ({
        closeWindow: () => dispatch(toggleWindow(SKILLS_WINDOW, false)),
    })
)(SkillsContainer);
