import React, { Children } from 'react';

const makeChildTransformer = (match, transformProps) => (element) => {
    // skip primitive nodes
    if (typeof element.type !== 'function') {
        return element;
    }

    const { props } = element;

    if (match(element)) {
        return React.cloneElement(
            element,
            transformProps(props)
        );
    }

    if (props && props.children) {
        return React.cloneElement(
            element,
            {},
            Children.map(props.children, makeChildTransformer(match, transformProps))
        );
    }

    return element;
};

export default makeChildTransformer;
