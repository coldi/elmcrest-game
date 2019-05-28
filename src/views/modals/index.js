import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../modules/modals';

class ModalContainer extends React.PureComponent {
    static propTypes = {
        component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
        confirm: PropTypes.func,
        dismiss: PropTypes.func,
        modal: PropTypes.shape(),
    };

    static defaultProps = {
        confirm: () => {},
        dismiss: () => {},
        modal: null,
    };

    renderComponent() {
        const { component, modal, confirm, dismiss } = this.props;

        const componentProps = {
            title: modal.title,
            children: modal.message,
            confirmLabel: modal.confirm,
            dismissLabel: modal.dismiss,
            onConfirm: () => confirm(modal.id),
            onDismiss: () => dismiss(modal.id),
        };

        if (React.isValidElement(component)) {
            return React.cloneElement(component, componentProps);
        }

        return React.createElement(component, componentProps);
    }

    render() {
        return this.props.modal ? this.renderComponent() : null;
    }
}

export default connect(
    state => ({
        modal: state.modals[0],
    }),
    dispatch => ({
        confirm: id => dispatch(closeModal(id, true)),
        dismiss: id => dispatch(closeModal(id, false)),
    })
)(ModalContainer);
