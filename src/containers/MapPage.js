import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/MapPage';

export default connect(
  state => ({
    windowSize: state.windowSize,
  }),
  dispatch => bindActionCreators({}, dispatch),
)(Component);

export const onEnter = () => async () => {};
