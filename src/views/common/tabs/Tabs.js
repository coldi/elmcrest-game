import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Tabs.scss';

const parentPropTypes = {
    children: PropTypes.node.isRequired,
};

const Item = ({ children, onSelect }) => <div onClick={onSelect}>{children}</div>;

Item.propTypes = {
    ...parentPropTypes,
    label: PropTypes.node,
    onSelect: PropTypes.func,
};

Item.defaultProps = {
    onSelect: () => {},
};

Item.Head = ({ children }) => <div>{children}</div>;
Item.Head.propTypes = parentPropTypes;

Item.Content = ({ children }) => <div>{children}</div>;
Item.Content.propTypes = parentPropTypes;

export default class Tabs extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        activeIndex: PropTypes.number,
        vertical: PropTypes.bool,
    };

    static Item = Item;

    state = { activeIndex: 0 };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.activeIndex !== nextProps.activeIndex &&
            nextProps.activeIndex >= 0
        ) {
            return { activeIndex: nextProps.activeIndex };
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.renderHead = this.renderHead.bind(this);
    }

    processHeads() {
        const { children } = this.props;

        return Children.toArray(children).map(child => {
            if (child.props.label) {
                return child.props.label;
            }

            return Children.toArray(child.props.children).filter(
                grandChild => grandChild.type === Tabs.Item.Head
            )[0];
        });
    }

    processContent() {
        const { children } = this.props;
        const { activeIndex } = this.state;
        const activeItem = Children.toArray(children)[activeIndex];

        if (activeItem.props.label) {
            return activeItem.props.children;
        }

        return Children.toArray(activeItem.props.children).filter(
            grandChild => grandChild.type === Tabs.Item.Content
        )[0];
    }

    handleHeadClick(index) {
        this.setState({
            activeIndex: index,
        });
    }

    renderHead(head, index) {
        const { children } = this.props;
        const { activeIndex } = this.state;

        const className = classNames(styles.head, {
            [styles.activeHead]: index === activeIndex,
        });

        const tabItem = Children.toArray(children)[index];

        const handleClick = () => {
            this.handleHeadClick(index);
            tabItem.props.onSelect(index);
        };

        return (
            <li key={index} className={className} onClick={handleClick}>
                {head}
            </li>
        );
    }

    render() {
        const heads = this.processHeads();
        const content = this.processContent();

        const className = classNames(styles.container, {
            [styles.horizontal]: !this.props.vertical,
            [styles.vertical]: this.props.vertical,
        });

        return (
            <div className={className}>
                <ul className={styles.heads}>{heads.map(this.renderHead)}</ul>
                <div className={styles.content}>{content}</div>
            </div>
        );
    }
}
