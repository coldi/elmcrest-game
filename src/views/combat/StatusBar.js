import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSkillById } from '../../modules/skills';
import { Skill, Heading } from '../common';
import T from '../i18n';
import styles from './StatusBar.scss';
import Portrait from './Portrait';

function StatusBar (props) {
    const rightId = props.rollout ? props.rollout.targetId : props.rightId;

    return (
        <div className={styles.container}>
            <div className={styles.portrait}>
                {props.leftId && <Portrait left characterId={props.leftId} />}
            </div>
            <div className={styles.action}>
                {props.skill && (
                    <div key={props.rollout.originId}>
                        <div className={styles.skill}>
                            <Skill skill={props.skill} />
                        </div>
                        <div className={styles.name}>
                            <Heading>
                                <T>skills.{props.skill.id}.name</T>
                            </Heading>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.portrait}>
                {rightId && <Portrait right characterId={rightId} noSkillBar />}
            </div>
        </div>
    );
}

StatusBar.propTypes = {
    children: PropTypes.node,
    leftId: PropTypes.string,
    rightId: PropTypes.string,
    rollout: PropTypes.shape(),
    skill: PropTypes.shape(),
};

export default connect(
    (state, props) => ({
        skill: props.rollout && getSkillById(state, props.rollout.skillId),
    })
)(StatusBar);
