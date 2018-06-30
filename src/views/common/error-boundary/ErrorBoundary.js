import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        scope: PropTypes.string,
        alert: PropTypes.bool,
        onCatch: PropTypes.func,
    };

    componentDidCatch (error, info) {
        const errorState = { error, info };

        if (this.props.onCatch) {
            this.props.onCatch(errorState);
        }

        if (this.props.alert && alert) {
            // eslint-disable-next-line  no-alert
            alert(`An error occured in ${this.props.scope || 'some component'}.`);
        }
    }

    render () {
        return this.props.children;
    }
}
