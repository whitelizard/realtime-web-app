import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/InnerApp';

export default connect(
  state => ({
    windowSize: state.windowSize,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(Component);
