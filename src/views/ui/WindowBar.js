import React from 'react';
import PropTypes from 'prop-types';
import { Block, Button, Grid } from '../common';
import T from '../i18n';
import { KEY } from '../constants';

export default class WindowBar extends React.Component {

    static propTypes = {
        windows: PropTypes.shape(),
        activeId: PropTypes.string,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        windows: {},
    };

    constructor (props) {
        super(props);

        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount () {
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount () {
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp (e) {
        const { windows, onSelect } = this.props;

        if (e.which === KEY.ESC) {
            onSelect(null);
            return;
        }

        Object.keys(windows).forEach((id) => {
            const window = windows[id];
            if (e.which === window.key) {
                onSelect(id);
            }
        });
    }

    render () {
        const { windows, activeId, onSelect } = this.props;
        const activeWindow = (activeId)
            ? windows[activeId].component
            : null;

        const buttons = Object.keys(windows).map(
            (id) => (
                <Grid.Item key={id}>
                    <Button
                        small
                        active={activeId === id}
                        onClick={() => onSelect(id)}
                    >
                        <T>ui.windows.{id}.name</T>
                    </Button>
                </Grid.Item>
            )
        );

        return (
            <Block>
                <Block>
                    <Grid smallGap>
                        {buttons}
                    </Grid>
                </Block>
                <Block>
                    {activeWindow}
                </Block>
            </Block>
        );
    }
}
