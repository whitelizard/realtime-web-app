import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Component from '../components/SelectLang';
import { updateLang } from '../ducks/app';

export default connect(
  state => ({
    active: state.app.get('lang'),
  }),
  dispatch =>
    bindActionCreators(
      {
        setLang: updateLang,
      },
      dispatch,
    ),
)(Component);
