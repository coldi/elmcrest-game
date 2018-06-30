import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { getCharacterSkillsById } from '../../modules/characters';
import SkillBar from './SkillBar';
import styles from './CharacterHandle.scss';

class CharacterHandle extends React.Component {

    static propTypes = {
        characterId: PropTypes.string,
        activeCharacterId: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.shape()),
        canSelect: PropTypes.bool,
        children: PropTypes.node,
        onCharacter: PropTypes.func,
        onSkill: PropTypes.func,
    };

    static defaultProps = {
        onCharacter: () => {},
        onSkill: () => {},
    };

    state = {
        active: false,
    };

    constructor (props) {
        super(props);

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleActivation = this.handleActivation.bind(this);
        this.handleDeactivation = this.handleDeactivation.bind(this);
        this.handleSkillSelect = this.handleSkillSelect.bind(this);
    }

    componentDidMount () {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    componentWillUnmount () {
        document.removeEventListener('mouseup', this.handleClickOutside);
    }

    handleClickOutside (e) {
        if (e.target.closest(`.${styles.container}`)) return;

        if (this.props.activeCharacterId === this.props.characterId) {
            this.props.onCharacter(null);
        }
    }

    handleActivation () {
        if (!this.props.canSelect) return;

        this.props.onCharacter(this.props.characterId);
        this.setState({ active: true });
    }

    handleDeactivation () {
        this.setState({ active: false });
    }

    handleSkillSelect (skillId) {
        this.props.onSkill(skillId);
        this.handleDeactivation();
    }

    render () {
        const active = this.props.canSelect && this.state.active;
        const className = classNames(styles.container, {
            [styles.active]: this.state.active,
        });

        return (
            <div
                className={className}
                onMouseDown={this.handleActivation}
                onMouseLeave={this.handleDeactivation}
            >
                {active ? (
                    <div className={styles.skills}>
                        <SkillBar
                            skills={this.props.skills}
                            onSelect={this.handleSkillSelect}
                        />
                    </div>
                ) : null}
                <div className={styles.character}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        skills: getCharacterSkillsById(state, props.activeCharacterId),
    })
)(CharacterHandle);
