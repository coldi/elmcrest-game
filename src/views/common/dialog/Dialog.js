import React from 'react';
import PropTypes from 'prop-types';
import T from '../../i18n';
import { Backdrop, Button, Grid, Panel, Portal } from '../';
import styles from './Dialog.scss';

export default function Dialog(props) {
    const { title, children, confirmLabel, dismissLabel, onConfirm, onDismiss } = props;

    const confirmBtn = confirmLabel ? (
        <Grid.Item>
            <Button small onClick={onConfirm}>
                <T>{confirmLabel}</T>
            </Button>
        </Grid.Item>
    ) : null;

    const dismissBtn = dismissLabel ? (
        <Grid.Item>
            <Button small onClick={onDismiss}>
                <T>{dismissLabel}</T>
            </Button>
        </Grid.Item>
    ) : null;

    const panelTitle = title ? <T>{title}</T> : null;

    return (
        <Portal>
            <div className={styles.container}>
                <Backdrop />
                <div className={styles.layout}>
                    <div className={styles.content}>
                        <Panel title={panelTitle}>
                            {children && (
                                <div className={styles.body}>
                                    <T>{children}</T>
                                </div>
                            )}
                            <div className={styles.actions}>
                                <Grid smallGap>
                                    {confirmBtn}
                                    {dismissBtn}
                                </Grid>
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
        </Portal>
    );
}

Dialog.propTypes = {
    children: PropTypes.node,
    confirmLabel: PropTypes.string,
    dismissLabel: PropTypes.string,
    onConfirm: PropTypes.func,
    onDismiss: PropTypes.func,
    title: PropTypes.string,
};

Dialog.defaultProps = {
    children: null,
    confirmLabel: 'confirm',
    dismissLabel: 'dismiss',
    onConfirm: () => {},
    onDismiss: () => {},
    title: '',
};
