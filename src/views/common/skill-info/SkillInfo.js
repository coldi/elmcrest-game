import React from 'react';
import PropTypes from 'prop-types';
import T from '../../i18n';
import { Attribute, Heading } from '../';
import styles from './SkillInfo.scss';

export default function SkillInfo(props) {
    const { skill } = props;

    return (
        <div className={styles.container}>
            <Heading minor>
                <T>skills.{skill.id}.name</T>
            </Heading>
            <div className={styles.description}>
                <T>skills.{skill.id}.descr</T>
            </div>
            <div className={styles.cost}>
                <Attribute modified={skill.cost}>
                    <T>common.combatTime</T>
                </Attribute>
            </div>
        </div>
    );
}

SkillInfo.propTypes = {
    skill: PropTypes.shape().isRequired,
};
