import clamp from 'lodash/clamp';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './ScrollContainer.scss';


export default class ScrollContainer extends React.Component {

    static propTypes = {
        children: PropTypes.node,
        autoScroll: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        autoScroll: false,
    };

    state = { scrollPos: 0 };

    container;
    content;
    observer;

    constructor (props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
        this.setContainerRef = this.setContainerRef.bind(this);
        this.setContentRef = this.setContentRef.bind(this);
    }

    componentDidMount () {
        if (this.props.autoScroll) {
            this.scrollToBottom();
        }

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                if (this.props.autoScroll) {
                    this.scrollToBottom();
                } else {
                    this.forceUpdate();
                }
            });
        });

        this.observer.observe(this.content, { childList: true, subtree: true });
    }

    componentWillUnmount () {
        this.observer.disconnect();
    }

    isReady () { return !!(this.container && this.content); }

    getScrollHeight () {
        const containerHeight = this.container.clientHeight;
        const contentHeight = this.content.clientHeight;

        return Math.max(0, contentHeight - containerHeight);
    }

    getScrollProgress () {
        return this.state.scrollPos / this.getScrollHeight();
    }

    getScrollLength () {
        const containerHeight = this.container.clientHeight || 1;
        const contentHeight = this.content.clientHeight || 1;

        return Math.min(1, containerHeight / contentHeight);
    }

    scrollTo (nextScrollPos = this.state.scrollPos) {
        const scrollPos = clamp(nextScrollPos, 0, this.getScrollHeight());

        this.setState(() => ({ scrollPos }));
    }

    scrollToTop () {
        this.scrollTo(0);
    }

    scrollToBottom () {
        this.scrollTo(this.getScrollHeight());
    }

    handleScroll (e) {
        const scrollDelta = e.deltaY * 0.5;

        this.scrollTo(this.state.scrollPos + scrollDelta);
    }

    setContainerRef (ref) {
        this.container = ref;
    }

    setContentRef (ref) {
        this.content = ref;
    }

    renderScrollbar () {
        if (!this.isReady()) {
            return null;
        }

        const progress = this.getScrollProgress();
        const length = this.getScrollLength();
        const availableHeight = this.container.clientHeight * (1 - length);
        const position = Math.floor(progress * availableHeight);
        const height = length * 100;
        const thumbStyle = {
            height: `${height}%`,
            transformOrigin: '0 0',
            transform: `translateY(${position}px)`,
        };

        if (availableHeight === 0) {
            return null;
        }

        return (
            <div className={styles.scrollTrack}>
                <div className={styles.scrollThumb} style={thumbStyle} />
            </div>
        );
    }

    render () {
        const { children } = this.props;
        const { scrollPos } = this.state;
        const contentStyle = {
            transform: `translateY(${-scrollPos}px)`,
        };

        return (
            <div className={styles.wrapper}>
                <div
                    className={styles.container}
                    onWheel={this.handleScroll}
                    ref={this.setContainerRef}
                >
                    <div
                        className={styles.content}
                        style={contentStyle}
                        ref={this.setContentRef}
                    >
                        {children}
                    </div>
                </div>
                {this.renderScrollbar()}
            </div>
        );
    }
}
