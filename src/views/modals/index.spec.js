import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from '../../store';
import { showModal } from '../../modules/modals';
import ModalContainer from './';

jest.mock('../common/portal/Portal', () => ({ children }) => children);

describe('views/modals', () => {
    let renderedElement;
    let store;
    let dispatch;
    let getState;

    const MockModal = ({
        onConfirm, // eslint-disable-line react/prop-types
        onDismiss, // eslint-disable-line react/prop-types
    }) => (
        <div className="modal">
            <button className="confirmBtn" onClick={onConfirm} />
            <button className="dismissBtn" onClick={onDismiss} />
        </div>
    );

    const renderComponent = () => {
        renderedElement = mount(
            <Provider store={store}>
                <div id="container">
                    <ModalContainer component={MockModal} />
                </div>
            </Provider>
        );
    };

    beforeEach(() => {
        store = createStore();
        dispatch = store.dispatch;
        getState = store.getState;

        renderComponent();
    });

    describe('Given the component was mounted to the DOM', () => {
        it('should show no modal', () => {
            expect(renderedElement.find('.modal').length).toBe(0);
        });

        describe('Given a modal gets dispatched', () => {
            let modalPromise;

            beforeEach(() => {
                modalPromise = dispatch(
                    showModal({
                        title: 'Title',
                        message: 'Message',
                    })
                );

                renderedElement.update();
            });

            it('should contain a modal item in the state', () => {
                expect(getState().modals.length).toBe(1);
            });

            it('should show the modal', () => {
                expect(renderedElement.find('.modal').length).toBe(1);
            });

            describe('Given the modal gets confirmed', () => {
                beforeEach(() => {
                    renderedElement.find('.confirmBtn').simulate('click');
                });

                it('should resolve the promise as confirmed', () => {
                    modalPromise.then(confirmed => expect(confirmed).toBe(true));
                });

                it('should contain no modal item in the state', () => {
                    expect(getState().modals.length).toBe(0);
                });

                it('should not show the modal anymore', () => {
                    expect(renderedElement.find('.modal').length).toBe(0);
                });
            });

            describe('Given the modal gets dismissed', () => {
                beforeEach(() => {
                    renderedElement.find('.dismissBtn').simulate('click');
                });

                it('should resolve the promise as dismissed', () => {
                    modalPromise.then(confirmed => expect(confirmed).toBe(false));
                });
            });
        });
    });
});
