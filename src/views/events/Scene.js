import React from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../i18n/Provider';
import T from '../i18n';
import { Block, Markdown, Stack, Portrait, Grid } from '../common';
import Actions from './Actions';
import styles from './Scene.scss';

export default class Scene extends React.PureComponent {
    static propTypes = {
        script: PropTypes.shape(),
        sceneId: PropTypes.string,
        onAction: PropTypes.func,
        setRef: PropTypes.func,
        active: PropTypes.bool
    };

    static defaultProps = {
        active: false
    };

    scene = null;

    constructor(props) {
        super(props);

        // execute scene script once on construction
        this.scene = props.script.scenes[props.sceneId]();
    }

    render() {
        const { script, sceneId, onAction, setRef, active } = this.props;
        const { params, stacks } = this.scene;
        const resourceId = this.scene.resourceId || script.resourceId;

        return (
            <div ref={setRef} className={styles.container}>
                <Block>
                    <Block>
                        <Grid noWrap>
                            {resourceId ? (
                                <Grid.Item>
                                    <Portrait resourceId={resourceId} />
                                </Grid.Item>
                            ) : null}
                            <Grid.Item growWidth>
                                <I18nContext.Consumer>
                                    {context => (
                                        <Markdown>
                                            {T.text(
                                                context.lang,
                                                `events.${script.id}.${sceneId}`,
                                                params
                                            )}
                                        </Markdown>
                                    )}
                                </I18nContext.Consumer>
                            </Grid.Item>
                        </Grid>
                    </Block>
                    {active &&
                        stacks && (
                            <div className={styles.stacks}>
                                {stacks.map((stack, index) => <Stack key={index} stack={stack} />)}
                            </div>
                        )}
                    {active && (
                        <Block>
                            <Actions
                                eventId={script.id}
                                sceneId={sceneId}
                                actions={this.scene.actions}
                                onSelect={onAction}
                            />
                        </Block>
                    )}
                </Block>
            </div>
        );
    }
}
