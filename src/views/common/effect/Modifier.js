import React from 'react';
import PropTypes from 'prop-types';
import { isAttributePercentage } from '../../../modules/characters';
import {
    isAddModifier,
    isMultiplyModifier,
    applyAddModifiers,
    applyMultiplyModifiers,
} from '../../../modules/effects';
import T from '../../i18n';
import { Attribute } from '../';

const renderAttributes = (values, isMultiplier) =>
    Object.keys(values).map(attr => {
        if (typeof values[attr] === 'object') {
            return renderAttributes(values[attr], isMultiplier);
        }

        return (
            <Attribute
                key={attr}
                modified={values[attr]}
                percent={isMultiplier || isAttributePercentage(attr)}
            >
                <T>char.attr.{attr}</T>
            </Attribute>
        );
    });

export default function Modifier({ effect }) {
    let values;
    let isMultiplier = false;

    if (isAddModifier(effect)) {
        values = applyAddModifiers([effect]);
    }

    if (isMultiplyModifier(effect)) {
        values = applyMultiplyModifiers([effect]);
        isMultiplier = true;
    }

    return <div>{renderAttributes(values, isMultiplier)}</div>;
}

Modifier.propTypes = {
    effect: PropTypes.shape().isRequired,
};
