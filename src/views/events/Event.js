import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import T from '../i18n';
import { Backdrop, Panel, ScrollContainer } from '../common';
import Scene from './Scene';
import styles from './Event.scss';

export default class Event extends React.Component {

    static propTypes = {
        script: PropTypes.shape(),
        scenes: PropTypes.arrayOf(PropTypes.string),
        hidden: PropTypes.bool,
        onAction: PropTypes.func,
    };

    static defaultProps = {
        script: null,
        scenes: [],
        hidden: false,
        onAction: () => {},
    };

    scrollContainer;

    constructor(props) {
        super(props);

        this.handleSceneElementRef = this.handleSceneElementRef.bind(this);
        this.setScrollContainerRef = this.setScrollContainerRef.bind(this);
    }

    handleSceneElementRef(ref) {
        if (this.scrollContainer && ref) {
            this.scrollContainer.scrollTo(ref.offsetTop);
        }
    }

    setScrollContainerRef(ref) {
        this.scrollContainer = ref;
    }

    render() {
        const { script, scenes, hidden, onAction } = this.props;
        const sceneList = scenes.map((id, index) => (
            <Scene
                key={`${id}_${index}`}
                sceneId={id}
                script={script}
                active={index === scenes.length - 1}
                onAction={onAction}
                setRef={this.handleSceneElementRef}
            />
        ));
        const className = classNames(
            styles.container,
            { [styles.hidden]: hidden }
        );

        return (
            <div className={className}>
                <Backdrop />
                <div className={styles.layout}>
                    <div className={styles.wrap}>
                        <Panel title={<T>events.{script.id}.title</T>}>
                            <div className={styles.content}>
                                <ScrollContainer ref={this.setScrollContainerRef}>
                                    {sceneList.slice(-1)}
                                </ScrollContainer>
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
        );
    }
}
