import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/DashboardGenerator';

export default connect(
  state => ({
    windowSize: state.windowSize,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(Component);
