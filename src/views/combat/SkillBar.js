import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Skill } from '../common';
import styles from './SkillBar.scss';

export default function SkillBar(props) {
    return (
        <div className={styles.container}>
            <Grid noWrap>
                {props.skills.map(skill => (
                    <div
                        key={skill.id}
                        className={styles.skill}
                        onMouseUp={() => props.onSelect(skill.id)}
                    >
                        <Skill
                            skill={skill}
                            inactive={props.selectedId && skill.id !== props.selectedId}
                        />
                    </div>
                ))}
            </Grid>
        </div>
    );
}

SkillBar.propTypes = {
    skills: PropTypes.arrayOf(PropTypes.shape()),
    selectedId: PropTypes.string,
    onSelect: PropTypes.func,
};

SkillBar.defaultProps = {
    onSelect: () => {},
};
