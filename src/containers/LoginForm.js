import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/LoginForm';
import { auth } from '../ducks/profile';

export default connect(
  state => ({
    serverAddress: state.profile.get('serverAddress'),
    loginErrorMsgId: state.profile.get('loginErrorMsgId'),
  }),
  dispatch =>
    bindActionCreators(
      {
        auth,
      },
      dispatch,
    ),
)(Component);
