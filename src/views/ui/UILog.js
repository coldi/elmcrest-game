import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLogMessages, getScreenMessages } from '../../modules/log';
import { MessageLog, ScreenMessage } from '../common';
import styles from './UILog.scss';


export class UILogContainer extends React.PureComponent {

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape()),
        screenMessage: PropTypes.shape(),
    };

    static defaultProps = {
        messages: [],
        screenMessage: null,
    };

    render () {
        return (
            <div className={styles.container}>
                <MessageLog messages={this.props.messages} />
                <ScreenMessage message={this.props.screenMessage} />
            </div>
        );
    }
}

export default connect(
    (state) => ({
        messages: getLogMessages(state),
        screenMessage: getScreenMessages(state).slice(-1)[0],
    })
)(UILogContainer);
