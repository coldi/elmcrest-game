import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSkillTree } from '../../../modules/skills';
import {
    getBaseCharacterById,
    updateCharacterAction,
} from '../../../modules/characters';
import T from '../../i18n';
import {
    Skill,
    StepperButton,
    Grid,
    Button,
 } from '../';
import styles from './SkillTree.scss';

export class SkillTreeContainer extends React.PureComponent {

    static propTypes = {
        characterId: PropTypes.string.isRequired,
        tree: PropTypes.arrayOf(PropTypes.shape()),
        character: PropTypes.shape(),
        updateCharacter: PropTypes.func,
    };

    state = { skills: {} };

    constructor(props) {
        super(props);

        this.state.skills = this.validateSkills(props.character.skills);

        this.handleResetEditing = this.handleResetEditing.bind(this);
        this.handleDoneEditing = this.handleDoneEditing.bind(this);
    }

    hasSkilledParents (skillId, skills, branch, parents = []) {
        for (const skill of branch) {
            if (skillId === skill.id) return !parents.includes(false);

            const nextParents = parents.concat(skills[skill.id] > 0);
            const result = this.hasSkilledParents(skillId, skills, skill.children, nextParents);

            if (result !== null) return result;
        }

        return null;
    }

    getPoints () {
        const { skillPoints } = this.props.character.progress;

        const originalSkillPoints = Object.values(this.props.character.skills)
            .reduce((sum, val) => sum + val, 0);

        const currentSkillPoints = Object.values(this.state.skills)
            .reduce((sum, val) => sum + val, 0);

        return skillPoints + (originalSkillPoints - currentSkillPoints);
    }

    validateSkills (skills) {
        const charSkills = this.state.skills || {};
        return Object.keys(charSkills).reduce((validSkills, skillId) => {
            if (!charSkills[skillId]) return validSkills;

            const valid = this.hasSkilledParents(skillId, skills, this.props.tree);
            if (valid !== false) return validSkills;

            return {
                ...validSkills,
                [skillId]: 0,
            };
        }, skills);
    }

    handleSkillChange(skill, inc) {
        const skills = this.validateSkills({
            ...this.state.skills,
            [skill]: (this.state.skills[skill] || 0) + inc
        });

        this.setState({ skills });
    }

    handleResetEditing() {
        this.setState({
            skills: this.props.character.skills,
        });
    }

    handleDoneEditing () {
        this.props.updateCharacter({
            skills: this.state.skills,
            progress: {
                skillPoints: this.getPoints(),
            },
        });
    }

    renderSkill (skill, canSpendPoints) {
        const skills = this.props.character.skills;
        const originalLevel = skills[skill.id] || 0;
        const currentLevel = this.state.skills[skill.id] || 0;

        return (
            <div className={styles.skill}>
                <Skill skill={skill} level={currentLevel} />
                {canSpendPoints ? (
                    <div className={styles.stepper}>
                        <StepperButton
                            min={originalLevel}
                            value={currentLevel}
                            max={Math.min(currentLevel + this.getPoints(), skill.levelLimit)}
                            onDecrease={() => this.handleSkillChange(skill.id, -1)}
                            onIncrease={() => this.handleSkillChange(skill.id, +1)}
                        />
                    </div>
                ) : null}
            </div>
        );
    }

    renderBranch (branch, parentLevel = 1) {
        const canSpendPoints = parentLevel > 0 && this.props.character.progress.skillPoints > 0;

        return (
            <div className={styles.branch}>
                {branch.map(skill => {
                    const currentLevel = this.state.skills[skill.id] || 0;
                    return (
                        <div key={skill.id} className={styles.innerBranch}>
                            {this.renderSkill(skill, canSpendPoints)}
                            {skill.children && this.renderBranch(skill.children, currentLevel)}
                        </div>
                    );
                })}
            </div>
        );
    }

    renderInfoBar () {
        return (
            <div className={styles.info}>
                <Grid noGap noWrap>
                    <Grid.Item growWidth>
                        <T params={{ points: this.getPoints() }}>
                            ui.availSkillPoints
                        </T>
                    </Grid.Item>
                    <Grid.Item>
                        <Button
                            small
                            onlyText
                            onClick={this.handleResetEditing}
                        >
                            <T>ui.reset</T>
                        </Button>
                    </Grid.Item>
                    <Grid.Item>
                        <Button
                            small
                            onClick={this.handleDoneEditing}
                        >
                            <T>ui.done</T>
                        </Button>
                    </Grid.Item>
                </Grid>
            </div>
        );
    }

    render() {
        const hasPoints = this.props.character.progress.skillPoints > 0;

        return (
            <div className={styles.container}>
                <div className={styles.tree}>
                    {this.renderBranch(this.props.tree)}
                </div>
                {hasPoints ? this.renderInfoBar() : null}
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        tree: getSkillTree(state),
        character: getBaseCharacterById(state, props.characterId),
    }),
    (dispatch, props) => ({
        updateCharacter: (charProps) => (
            dispatch(updateCharacterAction(props.characterId, charProps))
        ),
    })
)(SkillTreeContainer);
