import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Portal } from '..';
import styles from './Tooltip.scss';

const CustomTooltipContent = props => props.children;

CustomTooltipContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default class Tooltip extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        text: PropTypes.string,
        offset: PropTypes.number,
    };

    static defaultProps = {
        text: '[Tooltip]',
        offset: 10,
    };

    static Content = CustomTooltipContent;

    state = { active: false };

    element = null;

    constructor(props) {
        super(props);

        this.handleEnter = this.handleEnter.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.setElementRef = this.setElementRef.bind(this);
    }

    processChildren() {
        const { text, children } = this.props;
        this.tooltipContent = text;

        // remove custom tooltip content from children
        return Children.toArray(children).filter(
            child => child.type.name !== Tooltip.Content.name
        );
    }

    processContent() {
        const { children, text } = this.props;

        // find custom tooltip content in children
        const content = Children.toArray(children)
            .filter(child => child.type.name === Tooltip.Content.name)
            .pop();

        return content || text;
    }

    handleEnter() {
        this.setState({ active: true });
    }

    handleMouseMove(e) {
        if (!this.element) {
            return;
        }

        const { offset } = this.props;
        const { offsetWidth, offsetHeight } = this.element;
        const { innerWidth, innerHeight } = window;
        let x = e.clientX;
        let y = e.clientY;

        if (x + offsetWidth + offset > innerWidth) {
            x -= offsetWidth + offset;
        } else {
            x += offset;
        }

        if (y + offsetHeight + offset > innerHeight) {
            y -= offsetHeight + offset;
        } else {
            y += offset;
        }

        this.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    handleLeave() {
        this.setState({ active: false });
    }

    setElementRef(ref) {
        this.element = ref;
    }

    render() {
        const { active } = this.state;
        const content = this.processContent();
        const children = this.processChildren();

        const tooltip = active ? (
            <Portal>
                <div className={styles.offset} ref={this.setElementRef}>
                    <div className={styles.content}>{content}</div>
                </div>
            </Portal>
        ) : null;

        return (
            <div
                className={styles.container}
                onMouseEnter={this.handleEnter}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleLeave}
            >
                {children}
                {tooltip}
            </div>
        );
    }
}
