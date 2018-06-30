import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from '../';
import styles from './ContextMenu.scss';


const ContextMenuList = props => props.children;

ContextMenuList.propTypes = {
    children: PropTypes.node.isRequired,
};

const ContextMenuItem = (props) => (
    <div className={styles.item} onClick={props.onClick}>
        {props.label || props.children}
    </div>
);

ContextMenuItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node,
    label: PropTypes.node,
};

ContextMenuItem.defaultProps = {
    onClick: () => {},
};

export default class ContextMenu extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        render: PropTypes.func.isRequired,
    };

    static List = ContextMenuList;
    static Item = ContextMenuItem;

    state = { active: false };

    element = null;

    constructor (props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setElementRef = this.setElementRef.bind(this);
    }

    componentWillUnmount () {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleOpen (e) {
        if (this.state.active) {
            this.handleClose();
            return;
        }

        this.setState({
            active: true,
            x: e.clientX,
            y: e.clientY,
        });

        document.addEventListener('click', this.handleClickOutside);
    }

    handleClose () {
        this.setState({ active: false });

        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside (e) {
        if (!this.element || this.element.contains(e.target)) return;

        if (this.state.active) {
            this.handleClose();
        }
    }

    setElementRef (ref) {
        this.element = ref;
    }

    render () {
        const { active, x, y } = this.state;

        const menu = (active) ? (
            <Portal>
                <div
                    className={styles.offset}
                    style={{ left: x, top: y }}
                    ref={this.setElementRef}
                >
                    <div className={styles.content}>
                        {this.props.render()}
                    </div>
                </div>
            </Portal>
        ) : null;

        return (
            <div
                className={styles.container}
                onClick={this.handleOpen}
            >
                {this.props.children}
                {menu}
            </div>
        );
    }
}
