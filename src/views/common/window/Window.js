import React from 'react';
import PropTypes from 'prop-types';
import { Button, Heading } from '../';
import styles from './Window.scss';

export default function Window(props) {
    const { children, onClose, title } = props;

    const head = title ? (
        <header className={styles.head}>
            <Heading>{title}</Heading>
        </header>
    ) : null;

    return (
        <section className={styles.container}>
            {head}
            <div className={styles.close}>
                <Button small onClick={onClose}>
                    &times;
                </Button>
            </div>
            <div className={styles.body}>{children}</div>
        </section>
    );
}

Window.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
};

Window.defaultProps = {
    title: '',
};
