import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGeneralUIState, selectCharacterIdAction } from '../../../modules/ui';
import { getBaseCharacterById } from '../../../modules/characters';
import { Portrait, Tabs } from '../';

export class CharacterSelectionContainer extends React.PureComponent {
    static propTypes = {
        characterIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        selectedId: PropTypes.string,
        characters: PropTypes.arrayOf(PropTypes.shape()),
        children: PropTypes.func,
        selectCharacterId: PropTypes.func,
    };

    static defaultProps = {
        children: () => {},
    };

    state = {};

    render() {
        const { characters, selectedId, children, selectCharacterId } = this.props;

        const activeIndex = characters.findIndex(char => char.id === selectedId);

        return (
            <Tabs activeIndex={activeIndex} vertical>
                {characters.map(char => (
                    <Tabs.Item key={char.id} onSelect={() => selectCharacterId(char.id)}>
                        <Tabs.Item.Head>
                            <Portrait resourceId={char.resourceId} small />
                        </Tabs.Item.Head>
                        <Tabs.Item.Content>{children(char.id)}</Tabs.Item.Content>
                    </Tabs.Item>
                ))}
            </Tabs>
        );
    }
}

export default connect(
    (state, props) => ({
        selectedId: props.selectedId || getGeneralUIState(state).selectedCharacterId,
        characters: props.characterIds.map(id => getBaseCharacterById(state, id)),
    }),
    dispatch => ({
        selectCharacterId: charId => dispatch(selectCharacterIdAction(charId)),
    })
)(CharacterSelectionContainer);
