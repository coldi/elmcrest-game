import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getGroupCharacters } from '../../../modules/groups';
import { Grid, CharacterPortrait } from '../';
import styles from './GroupPortraits.scss';

export class GroupPortraitsContainer extends React.PureComponent {
    static propTypes = {
        groupId: PropTypes.string.isRequired,
        characters: PropTypes.arrayOf(PropTypes.shape()),
        align: PropTypes.oneOf(['left', 'right']),
        resources: PropTypes.bool,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        onSelect: () => {},
    };

    state = {};

    render() {
        const { props } = this;

        const className = classNames(styles.container, {
            [styles.alignLeft]: props.align === 'left',
            [styles.alignRight]: props.align === 'right',
        });

        return (
            <div className={className}>
                <Grid smallGap noWrap>
                    {props.characters.map(char => (
                        <CharacterPortrait
                            key={char.id}
                            character={char}
                            onClick={() => props.onSelect(char.id)}
                            resources={props.resources}
                            progressBar
                        />
                    ))}
                </Grid>
            </div>
        );
    }
}

export default connect((state, props) => ({
    characters: getGroupCharacters(state, props.groupId),
}))(GroupPortraitsContainer);
