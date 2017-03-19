import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/IndexPage';

export default connect(() => ({}), dispatch => bindActionCreators({}, dispatch))(Component);
