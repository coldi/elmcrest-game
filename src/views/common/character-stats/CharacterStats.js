import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getBaseCharacterById,
    getComputedCharacterById,
    getCharacterById,
    isAttributePercentage,
    updateCharacterAction,
} from '../../../modules/characters';
import T from '../../i18n';
import { Attribute, Grid, Block, Button, StepperButton } from '../';
import styles from './CharacterStats.scss';

/* eslint-disable  class-methods-use-this */
export class CharacterStatsContainer extends React.PureComponent {
    static propTypes = {
        characterId: PropTypes.string.isRequired,
        baseCharacter: PropTypes.shape(),
        computedCharacter: PropTypes.shape(),
        character: PropTypes.shape(),
        editable: PropTypes.bool,
        updateCharacter: PropTypes.func,
    };

    static defaultProps = {
        editable: false,
    };

    state = {
        base: null,
        points: 0,
    };

    constructor(props) {
        super(props);

        this.state.base = props.baseCharacter.base;
        this.state.points = props.baseCharacter.progress.basePoints;

        this.handleResetEditing = this.handleResetEditing.bind(this);
        this.handleDoneEditing = this.handleDoneEditing.bind(this);
    }

    handleAttrDecrease(attr) {
        this.setState(state => ({
            base: {
                ...state.base,
                [attr]: state.base[attr] - 1,
            },
            points: state.points + 1,
        }));
    }

    handleAttrIncrease(attr) {
        this.setState(state => ({
            base: {
                ...state.base,
                [attr]: state.base[attr] + 1,
            },
            points: state.points - 1,
        }));
    }

    handleResetEditing() {
        this.setState({
            base: this.props.baseCharacter.base,
            points: this.props.baseCharacter.progress.basePoints,
        });
    }

    handleDoneEditing() {
        this.props.updateCharacter({
            base: this.state.base,
            progress: {
                basePoints: this.state.points,
            },
        });
    }

    renderAttribute(attr, base, modified) {
        switch (attr) {
            case 'HP':
            case 'AP':
            case 'level':
                return null;
            default:
                return (
                    <Attribute
                        key={attr}
                        base={base}
                        modified={modified}
                        percent={isAttributePercentage(attr)}
                    >
                        <T>char.attr.{attr}</T>
                    </Attribute>
                );
        }
    }

    renderBaseStats() {
        const base = this.props.baseCharacter.base;
        const modified = this.props.character.base;
        const attributes = Object.keys(base);

        return attributes.map(attr =>
            this.renderAttribute(attr, base[attr], modified[attr])
        );
    }

    renderEditableBaseStats() {
        const base = this.props.baseCharacter.base;
        const modified = this.props.character.base;
        const attributes = Object.keys(this.state.base);

        return (
            <Block>
                {attributes.map(attr => (
                    <Grid key={attr} noWrap noGap>
                        <Grid.Item growWidth>
                            {this.renderAttribute(
                                attr,
                                this.state.base[attr],
                                modified[attr] + (this.state.base[attr] - base[attr])
                            )}
                        </Grid.Item>
                        <Grid.Item>
                            <div className={styles.stepper}>
                                <StepperButton
                                    min={base[attr]}
                                    value={this.state.base[attr]}
                                    max={this.state.base[attr] + this.state.points}
                                    onDecrease={() => this.handleAttrDecrease(attr)}
                                    onIncrease={() => this.handleAttrIncrease(attr)}
                                />
                            </div>
                        </Grid.Item>
                    </Grid>
                ))}
                <div className={styles.summary}>
                    <Grid noGap noWrap>
                        <Grid.Item growWidth>
                            <span className={styles.availPoints}>
                                <T params={{ points: this.state.points }}>
                                    ui.availBasePoints
                                </T>
                            </span>
                        </Grid.Item>
                        <Grid.Item>
                            <Button small onlyText onClick={this.handleResetEditing}>
                                <T>ui.reset</T>
                            </Button>
                        </Grid.Item>
                        <Grid.Item>
                            <Button small onClick={this.handleDoneEditing}>
                                <T>ui.done</T>
                            </Button>
                        </Grid.Item>
                    </Grid>
                </div>
            </Block>
        );
    }

    renderComputedStats() {
        const base = this.props.computedCharacter.computed;
        const modified = this.props.character.computed;
        const attributes = Object.keys(base);

        return attributes.map(attr =>
            this.renderAttribute(attr, base[attr], modified[attr])
        );
    }

    render() {
        const progress = this.props.baseCharacter.progress;
        const editable = this.props.editable && progress.basePoints > 0;

        return (
            <div className={styles.container}>
                <Grid consistent>
                    <Grid.Item>
                        {editable
                            ? this.renderEditableBaseStats()
                            : this.renderBaseStats()}
                    </Grid.Item>
                    <Grid.Item>{this.renderComputedStats()}</Grid.Item>
                </Grid>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({
        baseCharacter: getBaseCharacterById(state, props.characterId),
        computedCharacter: getComputedCharacterById(state, props.characterId),
        character: getCharacterById(state, props.characterId),
    }),
    (dispatch, props) => ({
        updateCharacter: charProps =>
            dispatch(updateCharacterAction(props.characterId, charProps)),
    })
)(CharacterStatsContainer);
