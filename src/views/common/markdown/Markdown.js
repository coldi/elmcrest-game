import React, { Children } from 'react';
import PropTypes from 'prop-types';
import snarkdown from 'snarkdown';

export default class Markdown extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node,
        container: PropTypes.string,
    };

    static defaultProps = {
        children: '',
        container: 'div',
    };

    renderChildren(children) {
        /* eslint-disable  react/no-danger */
        return Children.map(children, child => {
            if (typeof child === 'string') {
                return <div dangerouslySetInnerHTML={{ __html: snarkdown(child) }} />;
            }

            if (React.isValidElement(child) && child.props.children) {
                return this.renderChildren(child.props.children);
            }

            return child;
        });
    }

    render() {
        const Container = this.props.container;

        return (
            <Container className="markdown">
                {this.renderChildren(this.props.children)}
            </Container>
        );
    }
}
