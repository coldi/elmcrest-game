import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    getCurrentEvent,
    loadEventScript,
    addActionToCurrentEventAction,
    endCurrentEvent,
} from '../../modules/events';
import { getGeneralUIState } from '../../modules/ui';
import Event from './Event';


class EventContainer extends React.PureComponent {

    static propTypes = {
        event: PropTypes.shape(),
        hidden: PropTypes.bool,
        addAction: PropTypes.func,
        endEvent: PropTypes.func,
        loadEventScript: PropTypes.func,
    };

    static defaultProps = {
        event: null,
        addAction: () => {},
        loadEventScript: () => {},
    };

    state = { script: null };

    componentDidMount() {
        this.handleEventScript(this.props.event);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.event) {
            this.setState({ script: null });
        }
    }

    componentDidUpdate(prevProps) {
        const currentEvent = prevProps.event;
        const nextEvent = this.props.event;

        if (
            nextEvent &&
            (!currentEvent || currentEvent.id !== nextEvent.id)
        ) {
            this.handleEventScript(nextEvent);
        }
    }

    async handleEventScript(event) {
        const script = (event && event.id)
            ? await this.props.loadEventScript(event.id)
            : null;

        this.setState({ script });
    }

    renderEvent() {
        return (
            <Event
                script={this.state.script}
                scenes={this.props.event.scenes}
                hidden={this.props.hidden}
                onAction={this.props.addAction}
            />
        );
    }

    render() {
        return this.props.event && this.state.script
            ? this.renderEvent()
            : null;
    }
}

export default connect(
    (state) => ({
        event: getCurrentEvent(state),
        hidden: !getGeneralUIState(state).visible,
    }),
    (dispatch) => ({
        addAction: (actionId) => dispatch(addActionToCurrentEventAction(actionId)),
        endEvent: () => dispatch(endCurrentEvent()),
        loadEventScript: (id) => dispatch(loadEventScript(id)),
    })
)(EventContainer);
