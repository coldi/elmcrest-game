import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import styles from './CharacterAvatar.scss';

export default class CharacterAvatar extends React.Component {

    static propTypes = {
        character: PropTypes.shape(),
        flip: PropTypes.bool,
        scale: PropTypes.number,
        interactive: PropTypes.bool,
        selected: PropTypes.bool,
        onClick: PropTypes.func,
        setRef: PropTypes.func,
    };

    static defaultProps = {
        onClick: () => {},
        setRef: () => {},
    };

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        this.props.onClick(this.props.character.id);
    }

    render () {
        const { props } = this;
        const { resourceId, computed } = props.character;

        const wrapClassName = classNames(
            styles.wrap,
            { [styles.flipped]: props.flip }
        );

        const spriteClassName = classNames(
            styles.sprite,
            { [styles.alive]: computed.HP > 0 }
        );

        const backgroundSrc = `assets/textures/characters/${resourceId}/world.png`;
        const spriteStyle = {
            backgroundImage: `url(${backgroundSrc})`,
        };

        if (props.scale) {
            spriteStyle.transform = `scale(${props.scale})`;
        }

        const activeAreaClassName = classNames(
            styles.activeArea,
            {
                [styles.selected]: props.selected,
                [styles.interactive]: props.interactive,
            }
        );

        return (
            <div className={styles.container} ref={props.setRef}>
                <div className={wrapClassName}>
                    <div className={spriteClassName} style={spriteStyle} />
                </div>
                <div className={activeAreaClassName} onClick={this.handleClick} />
            </div>
        );
    }
}
