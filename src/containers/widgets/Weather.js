import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Weather from '../../components/dashboard/Weather';
import { fetchWeather } from '../../ducks/app';

export default connect(
  state => ({
    weather: state.app.get('weather'),
  }),
  dispatch =>
    bindActionCreators(
      {
        fetchWeather,
      },
      dispatch,
    ),
)(Weather);
