import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isModifier, isMutator, COMBAT_CONTEXT } from '../../../modules/effects';
import { getCurrentTurn } from '../../../modules/cycle';
import { getBattleTurn } from '../../../modules/combat';
import { Grid } from '../';
import Modifier from './Modifier';
import Mutator from './Mutator';
import styles from './Effect.scss';

const calcDuration = (effect, currentTurn) => {
    if (effect.begin !== null) {
        return effect.begin + effect.duration - currentTurn;
    }

    return effect.duration;
};

export class EffectContainer extends React.PureComponent {
    static propTypes = {
        effect: PropTypes.shape().isRequired,
        currentTurn: PropTypes.number,
    };

    state = {};

    render() {
        const { currentTurn, effect } = this.props;

        let element;

        if (isModifier(effect)) {
            element = <Modifier effect={effect} />;
        }

        if (isMutator(effect)) {
            element = <Mutator effect={effect} />;
        }

        const duration = calcDuration(effect, currentTurn);

        return (
            <div className={styles.container}>
                <Grid noWrap smallGap>
                    <Grid.Item growWidth>{element}</Grid.Item>
                    {duration > 0 && (
                        <Grid.Item>
                            <span>{duration}&#9684;</span>
                        </Grid.Item>
                    )}
                </Grid>
            </div>
        );
    }
}

export default connect((state, props) => ({
    currentTurn:
        props.effect.context === COMBAT_CONTEXT
            ? getBattleTurn(state)
            : getCurrentTurn(state),
}))(EffectContainer);
