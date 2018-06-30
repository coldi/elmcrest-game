import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { translate } from '../../modules/i18n';
import { I18nContext } from './Provider';


const Placeholder = ({ children, forKey, ...otherProps }) => (
    React.cloneElement(Children.only(children), otherProps)
    // React.createElement('span', otherProps, children)
);

Placeholder.propTypes = {
    children: PropTypes.node.isRequired,
    forKey: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};


const matchPattern = (textParts, pattern) => {
    const patternKeys = Object.keys(pattern);

    return textParts.map((text, index, arr) => {
        // get the following text part
        const nextText = arr[index + 1];

        /**
         * This is necessary because the pattern we are looking for
         * usually follows after the parameter, e.g. for %:
         * 'This text uses a {customValue}% percent pattern.'
         */

        // test for pattern matches and map boolean result to object
        const matches = patternKeys.reduce((obj, key) => ({
            [key]: (
                nextText &&
                (pattern[key] instanceof RegExp) &&
                (pattern[key]).test(nextText)
            ),
        }), {});

        // remove matched patterns from current text
        const matchedText = patternKeys.reduce((str, key) => (
            (pattern[key] instanceof RegExp)
                ? str.replace(pattern[key], '')
                : str
        ), text);

        return { text: matchedText, matches };
    });
};


export default class Translate extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        string: PropTypes.string,
        params: PropTypes.oneOfType([
            PropTypes.shape(),
            PropTypes.array,
        ]),
        pattern: PropTypes.shape(),
    };

    static defaultProps = {
        children: null,
        string: null,
        params: {},
        pattern: {},
    };

    static text = translate;
    static place = Placeholder;

    renderTranslation (lang) {
        const { children, string, params, pattern, ...otherProps } = this.props;
        const childrenArray = Children.toArray(children);
        let result;

        if (!string && childrenArray.length) {
            if (childrenArray.every(child => typeof child === 'string')) {
                // use child string(s) as translation key
                result = translate(lang, childrenArray.join(''), params);
            } else {
                // use children directly
                result = childrenArray;
            }
        } else if (string && !childrenArray.length) {
            // use string prop as translation key
            result = translate(lang, string, params);
        } else {
            // process children and use them as translation values
            const separator = '@@@';

            // replace every occurence of a translation key with a separator
            const values = childrenArray.reduce((obj, child) => ({
                ...obj,
                [child.props.forKey]: separator,
            }), { ...params });

            // split the tokenized string at the separators.
            const textParts = translate(lang, string, values).split(separator);

            // implement custom pattern matching
            const matchedParts = matchPattern(textParts, pattern);

            // create a new array containing the separated chunks of the text
            // and merge the replacement
            result = matchedParts.reduce((arr, { text, matches }, index) => {
                const child = childrenArray[index];

                return [
                    ...arr,
                    text,
                    // pass matches as props to component
                    child && React.cloneElement(child, matches),
                ];
            }, []);
        }

        return (typeof result !== 'string' || Object.keys(otherProps).length)
            ? React.createElement('span', otherProps, result)
            : result;
    }

    render () {
        return (
            <I18nContext.Consumer>
                {context => this.renderTranslation(context.lang)}
            </I18nContext.Consumer>
        );
    }
}
