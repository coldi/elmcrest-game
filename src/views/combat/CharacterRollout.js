import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getSkillById } from '../../modules/skills';
import playAnimation from './utils/playAnimation';
import pause from './utils/pause';
import attackAnimation from './animations/attack';
import hitAnimation from './animations/hit';
import deadAnimation from './animations/dead';
import supportAnimation from './animations/support';
import styles from './CharacterRollout.scss';
import spriteStyles from './sprites.scss';

/*
 * This component handles presentation of combat rollouts.
 * It is somewhat tricky: It uses JS-based animations for characters
 * and CSS-based animations for sprite effects like blood on attack.
 * The JS animations can be `await`ed, which is good.
 * CSS animations cannot, which is bad, and also what makes this whole
 * approach inconsistent in my opinion.
 * Maybe future me will find a cleaner solution.
 */

function determineAnimation(type, isOrigin) {
    switch (type) {
        case 'attack':
            return isOrigin ? attackAnimation : hitAnimation;
        case 'support':
            return isOrigin ? supportAnimation : null;
        case 'dead':
            return isOrigin ? null : deadAnimation;
        default:
            return null;
    }
}

class CharacterRollout extends React.Component {
    static propTypes = {
        character: PropTypes.shape().isRequired,
        rollout: PropTypes.shape(),
        skill: PropTypes.shape(),
        active: PropTypes.bool,
        flip: PropTypes.bool,
        children: PropTypes.node,
        onApply: PropTypes.func,
        onRemove: PropTypes.func,
    };

    static defaultProps = {
        onApply: () => {},
        onRemove: () => {},
    };

    element = null;
    state = {
        sprite: null,
    };

    constructor(props) {
        super(props);

        this.setElementRef = this.setElementRef.bind(this);
    }

    componentDidMount() {
        this.processRollout(this.props, true);
    }

    componentDidUpdate(prevProps) {
        this.processRollout(prevProps);
    }

    async processRollout(prevProps = {}, forceRollout = false) {
        const nextRollout = this.props.rollout;

        // skip if there is no rollout to apply
        if (!nextRollout || (!forceRollout && nextRollout === prevProps.rollout)) return;

        const isOrigin = nextRollout.originId === this.props.character.id;
        const isTarget = nextRollout.targetId === this.props.character.id;

        // skip if this character is neither origin nor target
        if (!isOrigin && !isTarget) return;

        if (nextRollout.skillId || nextRollout.stateId) {
            const animationType = this.props.skill
                ? this.props.skill.animationType
                : nextRollout.stateId;
            const animation = determineAnimation(animationType, isOrigin);

            this.setState({ sprite: null, output: null });

            // wait a bit before playing any rollout animation
            await pause(1000);

            if (animationType === 'attack' && isTarget) {
                // assign a sprite css class
                this.setState({ sprite: spriteStyles.blood });
                this.setState({
                    output: Math.round(nextRollout.result[0].effects[0].value),
                });
            }
            if (animationType === 'support' && isTarget) {
                // assign a sprite css class
                this.setState({ sprite: spriteStyles.buff });
            }

            if (!animation) await pause(500);
            else {
                await playAnimation(animation, {
                    element: this.element,
                    flipped: this.props.flip,
                });
            }

            if (!isOrigin) return;

            this.props.onApply();
        }

        if (!isOrigin) return;

        // await rollout delay
        await pause(300 + nextRollout.delay);

        this.props.onRemove();
    }

    setElementRef(ref) {
        this.element = ref;
    }

    render() {
        const className = classNames(styles.container, {
            [styles.active]: this.props.active,
        });

        return (
            <div className={className}>
                {this.state.sprite && <div className={this.state.sprite} />}
                {this.state.output && (
                    <div className={styles.output}>{this.state.output}</div>
                )}
                <div ref={this.setElementRef} className={styles.wrap}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect((state, props) => ({
    skill: props.rollout && getSkillById(state, props.rollout.skillId),
}))(CharacterRollout);
