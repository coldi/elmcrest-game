import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Image, SkillInfo, Tooltip } from '../';
import styles from './Skill.scss';

export default function Skill(props) {
    const className = classNames(styles.container, {
        [styles.inactive]: props.inactive || props.level === 0,
    });

    const imgSrc = `skills/${props.skill.resourceId}.png`;

    return (
        <div className={className}>
            <Tooltip>
                <Tooltip.Content>
                    <SkillInfo skill={props.skill} />
                </Tooltip.Content>
                <div className={styles.wrap} onClick={props.onClick}>
                    <Image src={imgSrc} />
                    {props.level ? (
                        <span className={styles.level}>{props.level}</span>
                    ) : null}
                </div>
            </Tooltip>
        </div>
    );
}

Skill.propTypes = {
    skill: PropTypes.shape().isRequired,
    level: PropTypes.number,
    inactive: PropTypes.bool,
    onClick: PropTypes.func,
};

Skill.defaultProps = {
    onClick: () => {},
};
