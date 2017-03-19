import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/ProfilePage';
import { openSnackbar } from '../ducks/app';
import { updatePassword } from '../ducks/profile';

export default connect(
  state => ({
    profile: state.profile.get('profile'),
  }),
  dispatch =>
    bindActionCreators(
      {
        openSnackbar,
        updatePassword,
      },
      dispatch,
    ),
)(Component);
