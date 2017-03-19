import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/TopBar';
import { toggleMenu } from '../ducks/app';

export default connect(
  state => ({
    loading: state.app.get('loading'),
  }),
  dispatch =>
    bindActionCreators(
      {
        toggleMenu,
      },
      dispatch,
    ),
)(Component);
