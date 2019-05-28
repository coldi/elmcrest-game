import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCachedFieldByCoord } from '../../modules/world';
import { getGroupByCoord } from '../../modules/groups';
import { Block, GroupPortraits } from '../common';

export class FieldContextContainer extends React.PureComponent {
    static propTypes = {
        coord: PropTypes.arrayOf(PropTypes.number),
        field: PropTypes.shape(),
        group: PropTypes.shape(),
    };

    static defaultProps = {
        coord: null,
        field: null,
        group: null,
    };

    state = {};

    renderFieldInfo() {
        const { coord, field } = this.props;

        if (coord && field.discovered) {
            const [x, y] = coord;

            return (
                <Block>
                    <Block noGap>Position: {`${x} : ${y}`}</Block>
                    <Block noGap>Climate: {field.climate}</Block>
                    <Block noGap>Elevation: {field.elevation}</Block>
                </Block>
            );
        }

        return null;
    }

    renderGroup() {
        const { group, field } = this.props;

        if (group && field.visible) {
            return (
                <Block>
                    <Block>
                        <GroupPortraits groupId={group.id} align="right" />
                    </Block>
                </Block>
            );
        }

        return null;
    }

    render() {
        const fieldInfo = this.renderFieldInfo();
        const group = this.renderGroup();

        return (
            <Block>
                {fieldInfo}
                {group && <hr />}
                {group}
            </Block>
        );
    }
}

export default connect((state, props) => ({
    field: getCachedFieldByCoord(state, props.coord),
    group: getGroupByCoord(state, props.coord),
}))(FieldContextContainer);
