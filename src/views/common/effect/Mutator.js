import React from 'react';
import PropTypes from 'prop-types';
import memoize from '../../../modules/utils/memoize';
import T from '../../i18n';
import { Attribute } from '../';

export const processDescription = memoize(
    effect => effect,
    (effect) => {
        const pattern = { percent: /^[%]/ };

        return (
            <T string={`effects.${effect.name}.descr`} pattern={pattern}>
                <Attribute forKey={0} modified={effect.value} inline />
            </T>
        );
    }
);

export default function Mutator({ effect }) {
    return (
        <div>{processDescription(effect)}</div>
    );
}

Mutator.propTypes = {
    effect: PropTypes.shape().isRequired,
};
