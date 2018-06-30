import range from 'lodash/range';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCharacterById, getExpByLevel, getLevelByExp } from '../../../modules/characters';
import T from '../../i18n';
import { ProgressBar } from '../';

class ExpProgressBar extends React.PureComponent {

    constructor (props) {
        super(props);

        this.state = {
            exp: props.currentExp,
            level: props.currentLevel,
        };
    }

    componentDidMount () {
        const nextExp = this.state.exp + this.props.expGain;
        setTimeout(() => this.setState({ exp: nextExp }), 500);
    }

    componentDidUpdate () {
        const nextLevel = this.state.level + 1;

        // check if exp reaches into the next level (-> level up)
        if (this.state.exp > this.getExpByLevel(nextLevel)) {
            // set next level and reset exp temporarily
            // so we can see a reasonable progress bar animation
            setTimeout(() => this.setState({
                level: nextLevel,
                exp: this.getExpByLevel(nextLevel),
            }), 500);

            // set exp to the actual value after short delay
            setTimeout(() => this.setState({
                exp: this.props.currentExp + this.props.expGain,
            }), 600);
        }
    }

    getExpByLevel (level) {
        return this.props.levelExpMap[level - this.props.currentLevel];
    }

    render () {
        const { state } = this;

        return (
            <ProgressBar
                key={state.level}
                value={state.exp}
                min={this.getExpByLevel(state.level)}
                max={this.getExpByLevel(state.level + 1)}
                label={<span><T>common.level</T> {state.level}</span>}
                maxLabel={<span><T>common.level</T> {state.level + 1}</span>}
            />
        );
    }
}

ExpProgressBar.propTypes = {
    characterId: PropTypes.string.isRequired,
    expGain: PropTypes.number,
    currentExp: PropTypes.number,
    currentLevel: PropTypes.number,
    levelExpMap: PropTypes.arrayOf(PropTypes.number),
};

ExpProgressBar.defaultProps = {
    expGain: 0,
};

export default connect(
    (state, props) => {
        const char = getCharacterById(state, props.characterId);
        const minLevel = char.computed.level;
        const maxLevel = getLevelByExp(state, char.progress.exp + props.expGain) + 1;

        return {
            currentExp: char.progress.exp,
            currentLevel: minLevel,
            levelExpMap: range(minLevel, maxLevel + 1).map(lvl => getExpByLevel(state, lvl)),
        };
    }
)(ExpProgressBar);
