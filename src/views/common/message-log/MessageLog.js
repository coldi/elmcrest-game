import React from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../../i18n/Provider';
import T from '../../i18n';
import { ScrollContainer, Markdown } from '../';
import styles from './MessageLog.scss';

export default class MessageLog extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape()),
    };

    static defaultProps = {};

    shouldComponentUpdate(nextProps) {
        const newestMessage = this.props.messages.slice(-1)[0];
        const nextNewestMessage = nextProps.messages.slice(-1)[0];

        return !!(
            newestMessage &&
            nextNewestMessage &&
            newestMessage.id !== nextNewestMessage.id
        );
    }

    renderMessages(lang) {
        return this.props.messages.map(message => (
            <li key={message.id} className={styles.message}>
                <Markdown>{T.text(lang, message.text, message.params)}</Markdown>
            </li>
        ));
    }

    render() {
        return (
            <ScrollContainer autoScroll>
                <ul className={styles.container}>
                    <I18nContext.Consumer>
                        {context => this.renderMessages(context.lang)}
                    </I18nContext.Consumer>
                </ul>
            </ScrollContainer>
        );
    }
}
