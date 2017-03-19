import React from 'react';
import { Map } from 'immutable';
import IPropTypes from 'react-immutable-proptypes';
import DocumentTitle from 'react-document-title';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import conf from '../app-config';
import Theme from '../styles';
import t from '../services/i18n';
import { extraSmall, small, medium, large } from '../styles/responsiveness';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.node.isRequired,
    snackbar: IPropTypes.map.isRequired,
    closeSnackbar: React.PropTypes.func.isRequired,
    lang: React.PropTypes.string.isRequired,
  };

  static childContextTypes = {
    lang: React.PropTypes.string,
    reflexbox: React.PropTypes.object,
  };

  getChildContext() {
    const { lang } = this.props;
    return {
      lang,
      reflexbox: {
        debug: true,
        breakpoints: {
          xs: `(min-width: ${extraSmall}px)`,
          sm: `(min-width: ${small}px)`,
          md: `(min-width: ${medium}px)`,
          lg: `(min-width: ${large}px)`,
        },
      },
    };
  }

  closeSnackbar = () => this.props.closeSnackbar();

  msgIdToText = (variables, tId) => {
    const l = this.props.lang;
    return t(l, 'msg', tId, variables.toJS());
  };

  render() {
    const { snackbar, lang, children } = this.props;
    return (
      <DocumentTitle title={conf.title}>
        <MuiThemeProvider muiTheme={Theme.muiTheme}>
          <div key={lang}>
            {children}
            <Snackbar
              open={snackbar.get('open')}
              message={snackbar.get('textLines', Map()).map(this.msgIdToText).join('\n')}
              autoHideDuration={snackbar.get('duration')}
              onRequestClose={this.closeSnackbar}
              bodyStyle={{ backgroundColor: snackbar.get('isError') ? 'red' : 'green' }}
            />
          </div>
        </MuiThemeProvider>
      </DocumentTitle>
    );
  }
}
