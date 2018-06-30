import React from 'react';
import PropTypes from 'prop-types';
import styles from './Panel.scss';
import { Heading, Grid } from '../';

const PanelTitle = (props) => (
    <header className={styles.title}>
        <Heading>
            {props.children}
        </Heading>
    </header>
);

PanelTitle.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function Panel (props) {
    const classNames = [styles.container];
    if (props.slim) {
        classNames.push(styles.slim);
    }

    const className = classNames.join(' ');

    const title = (props.title) ? (
        <Grid.Item>
            <PanelTitle>{props.title}</PanelTitle>
        </Grid.Item>
    ) : null;

    return (
        <div className={className}>
            <Grid column noWrap noGap>
                {title}
                <Grid.Item growHeight>
                    {props.children}
                </Grid.Item>
            </Grid>
        </div>
    );
}

Panel.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node,
    slim: PropTypes.bool,
};

Panel.defaultProps = {
    title: null,
    slim: false,
};
