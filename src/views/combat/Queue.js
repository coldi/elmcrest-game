import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import sortBy from 'lodash/sortBy';
import { COMBAT_CONTEXT } from '../../modules/effects';
import T from '../i18n';
import { CharacterPortrait, Tooltip, EffectsList, Heading } from '../common';
import styles from './Queue.scss';

export default class Queue extends React.Component {
    static propTypes = {
        entries: PropTypes.arrayOf(PropTypes.shape()),
        characters: PropTypes.arrayOf(PropTypes.shape()),
        selectedCharacterId: PropTypes.string,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        onSelect: () => {},
    };

    state = {};

    queue = [];

    constructor(props) {
        super(props);

        this.renderQueueEntry = this.renderQueueEntry.bind(this);
    }

    sortEntries() {
        // sort received entries 'temporary' like so,
        // because we want React to preserve the entries render order.
        this.queue = sortBy(this.props.entries, ['delay']);
    }

    getSortedIndex(charId) {
        return this.queue.findIndex(entry => entry.characterId === charId);
    }

    renderQueueEntry(entry) {
        const character = this.props.characters.find(
            char => char.id === entry.characterId
        );

        const index = this.getSortedIndex(character.id);
        const isFirst = index === 0;
        const isSelected = this.props.selectedCharacterId === character.id;
        const style = { transform: `translateX(${100 * index}%)` };

        const className = classNames(styles.entry, {
            [styles.first]: isFirst,
            [styles.selected]: isSelected,
        });

        const effects = character.effects.filter(
            effect => effect.context === COMBAT_CONTEXT
        );

        return (
            <div
                key={character.id}
                className={className}
                style={style}
                onClick={() => this.props.onSelect(character.id)}
            >
                <div className={styles.portrait}>
                    <Tooltip>
                        <Tooltip.Content>
                            <Heading sub>
                                <T>common.effects</T>
                            </Heading>
                            <EffectsList effects={effects} />
                        </Tooltip.Content>
                        <CharacterPortrait
                            character={character}
                            large={isFirst}
                            progressBar
                        />
                    </Tooltip>
                    {!isFirst && <span className={styles.delay}>+{entry.delay}</span>}
                </div>
            </div>
        );
    }

    render() {
        const { props } = this;

        this.sortEntries();

        return (
            <div className={styles.container}>
                <div className={styles.inner}>
                    {props.entries.map(this.renderQueueEntry)}
                </div>
            </div>
        );
    }
}
