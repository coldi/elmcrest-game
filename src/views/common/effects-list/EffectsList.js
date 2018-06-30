import React from 'react';
import PropTypes from 'prop-types';
import T from '../../i18n';
import { Grid, Heading, Effect } from '../';
import styles from './EffectsList.scss';

export default function EffectsList(props) {
    const effectsByRel = props.effects.reduce((obj, effect) => {
        if (!effect.rel) return obj;
        if (!obj[effect.rel]) obj[effect.rel] = []; // eslint-disable-line

        obj[effect.rel].push(effect);
        return obj;
    }, {});
    const commonEffects = props.effects.filter(effect => !effect.rel);

    return (
        <div className={styles.container}>
            <Grid smallGap>
                {!props.effects.length && (
                    <Grid.Item>
                        (<T>common.none</T>)
                    </Grid.Item>
                )}
                {commonEffects.length ? (
                    <Grid.Item>
                        <div className={styles.rel}>
                            <Heading sub><T>rel.common</T></Heading>
                            {commonEffects.map((effect) => (
                                <Effect key={effect.name} effect={effect} />
                            ))}
                        </div>
                    </Grid.Item>
                ) : null}
                {Object.entries(effectsByRel).map(([rel, effects]) => (
                    <Grid.Item key={rel}>
                        <div className={styles.rel}>
                            <Heading sub><T>rel.{rel}</T></Heading>
                            {effects.map((effect) => (
                                <Effect key={effect.name} effect={effect} />
                            ))}
                        </div>
                    </Grid.Item>
                ))}
            </Grid>
        </div>
    );
}

EffectsList.propTypes = {
    effects: PropTypes.arrayOf(PropTypes.shape()),
};

EffectsList.defaultProps = {
    effects: [],
};
