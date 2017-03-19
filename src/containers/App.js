import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/App';
import { toggleMenu, openSnackbar, closeSnackbar } from '../ducks/app';

export default connect(
  state => ({
    loading: state.app.get('loading'),
    snackbar: state.app.get('snackbar'),
    lang: state.app.get('i18n'),
  }),
  dispatch =>
    bindActionCreators(
      {
        toggleMenu,
        openSnackbar,
        closeSnackbar,
      },
      dispatch,
    ),
)(Component);
