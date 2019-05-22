import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLang } from '../../modules/i18n';

export const I18nContext = React.createContext({});

export class ProviderContainer extends React.PureComponent {
    static propTypes = {
        lang: PropTypes.string.isRequired,
        children: PropTypes.node,
    };

    static defaultProps = {
        children: null,
    };

    render() {
        const context = {
            lang: this.props.lang,
        };

        return (
            <I18nContext.Provider value={context}>
                {this.props.children}
            </I18nContext.Provider>
        );
    }
}

export default connect(state => ({ lang: getLang(state) }))(ProviderContainer);
