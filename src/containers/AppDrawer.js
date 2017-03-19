import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/AppDrawer';
import { toggleMenu } from '../ducks/app';
import { logout } from '../ducks/profile';

export default connect(
  state => ({
    menuOpen: state.app.get('menuOpen'),
    profile: state.profile.get('profile'),
    routing: state.routing,
  }),
  dispatch =>
    bindActionCreators(
      {
        toggleMenu,
        logout,
      },
      dispatch,
    ),
)(Component);
