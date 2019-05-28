import React from 'react';
import PropTypes from 'prop-types';
import T from '../../i18n';
import { Portal } from '../';
import styles from './ScreenMessage.scss';

export default class ScreenMessage extends React.PureComponent {
    static propTypes = {
        message: PropTypes.shape(),
    };

    static defaultProps = {};

    state = {
        messages: [],
        lastShownMessageId: null,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        const { message } = nextProps;
        const [lastMessage] = prevState.messages.slice(-1);

        if (
            (message && !lastMessage && prevState.lastShownMessageId !== message.id) ||
            (lastMessage && message && lastMessage.id !== message.id)
        ) {
            const slicedMessages = prevState.messages.slice(1);
            // skip current message when a new one is received
            const messages = [...slicedMessages, message];
            return {
                messages,
                lastShownMessageId: messages[0]
                    ? messages[0].id
                    : prevState.lastShownMessageId,
            };
        }

        return null;
    }

    constructor(props) {
        super(props);

        if (props.message) {
            this.state.lastShownMessageId = props.message.id;
        }

        this.removeMessage = this.removeMessage.bind(this);
    }

    /*
    shouldComponentUpdate (nextProps, nextState) {
        return this.state.messages.length !== nextState.messages.length;
    }
    */

    removeMessage() {
        this.setState(state => ({
            messages: state.messages.slice(1),
        }));
    }

    render() {
        const [currentMessage] = this.state.messages;

        if (!currentMessage) return null;

        return (
            <Portal>
                <div key={currentMessage.id} className={styles.container}>
                    <h2 className={styles.message} onAnimationEnd={this.removeMessage}>
                        <T params={currentMessage.params}>{currentMessage.text}</T>
                    </h2>
                </div>
            </Portal>
        );
    }
}
