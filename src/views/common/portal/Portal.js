import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Portal extends React.Component {
    static propTypes = {
        children: PropTypes.element,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        onUpdate: PropTypes.func,
    };

    static defaultProps = {
        onOpen: () => {},
        onClose: () => {},
        onUpdate: () => {},
    };

    node = null;

    componentDidMount() {
        this.props.onOpen(this.node);
    }

    componentDidUpdate() {
        this.props.onUpdate(this.node);
    }

    componentWillUnmount() {
        this.props.onClose();
        this.removeNode();
    }

    getNode() {
        if (!this.node) {
            this.node = document.createElement('div');
            document.body.appendChild(this.node);
        }

        return this.node;
    }

    removeNode() {
        if (this.node) {
            document.body.removeChild(this.node);
        }

        this.node = null;
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.getNode());
    }
}
