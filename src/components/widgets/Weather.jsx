import React from 'react';
import IPropTypes from 'react-immutable-proptypes';
// import { fromJS } from 'immutable';
import { Flex, Box } from 'reflexbox';
import Chip from 'material-ui/Chip';
import { MuiIcon } from 'react-material-ui-extras';
import Gauge, { stringToElement } from 'react-gauge-animated';
import { getWeatherNowAsMap, selectedWeatherValues } from '../../services/smhi';
// import t from '../../services/i18n';

const chipStyle = {
  // background: '#fff',
};

const labelBig = {
  background: '#fff',
  fontSize: 48,
};

const labelSmall = {
  background: '#fff',
};

const tempGaugeOptions = {
  size: 100,
  startAngle: Math.PI,
  stopAngle: Math.PI * 2,
  needleAngleMin: Math.PI * 0.9,
  needleAngleMax: Math.PI * 2.1,
  labelSteps: 0,
  stopPinColor: 0,
  markerWidth: 8,
  markerLength: 22,
  markerColors: i => `rgb(
    ${(i*5 - 20).toFixed(0)},
    ${(-(i - 10)*(i - 80)/6).toFixed(0)},
    ${(255 - 3*i).toFixed(0)})`,
  valueDisplay: true,
  valueDisplayPostfix: '&deg;C',
  min: 0,
  max: 50,
  stepValue: 1,
  mediumSteps: 0,
  largeSteps: 0,
  labelRadius: 0.76,
  needleSvg: (size) => {
    const c = 250;
    const scale = size / 500;
    return stringToElement(`
      <svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="width:${size}px; height:${size}px;">
        <g>
          <g transform="scale(${scale})">
            <circle cx="${c}" cy="${c}" r="15" style="fill:#000"/>
            <path d="M ${c} ${c + 6} L ${c * 1.9} ${c} L ${c} ${c - 6} z" fill="#000" stroke="#111"/>
          </g>
        </g>
      </svg>
    `);
  },
};

class Weather extends React.PureComponent {

  static propTypes = {
    // height: React.PropTypes.number.isRequired,
    position: IPropTypes.map,
    weather: IPropTypes.list,
    fetchWeather: React.PropTypes.func.isRequired,
  };

  constructor(props, c) {
    super(props, c);
    const { position, fetchWeather } = this.props;
    this.sent = false;
    this.done = false;
    if (position && !position.isEmpty()) {
      this.sent = true;
      fetchWeather(position.get(0), position.get(1));
    // } else { // DEBUG
    //   fetchWeather(58, 16);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { position, fetchWeather, weather } = nextProps;
    if (this.done) return;
    if (weather && !weather.isEmpty()) {
      this.done = true;
      return;
    }
    if (position && !position.isEmpty() && !this.sent) {
      fetchWeather(position.get(0), position.get(1));
      this.sent = true;
    }
  }

  shouldComponentUpdate() {
    const { weather } = this.props;
    return !!(weather && !weather.isEmpty());
  }

  render() {
    const { weather } = this.props;
    const weatherValues = selectedWeatherValues(getWeatherNowAsMap(weather));
    // const l = this.context.lang;
    return (
      <div>
        {!weatherValues.isEmpty()
          ? <Flex column justify="center" align="center">
            {/* <Box p={1}><Chip style={chipStyle}>Temperature:</Chip></Box> */}
            <Box p={3}><Chip labelStyle={labelBig}>
              {weatherValues.get('t')} &deg;C
            </Chip></Box>
            <Box p={1}><Chip labelStyle={labelSmall}>
              Wind: {weatherValues.get('ws')} m/s
            </Chip></Box>
            {/* <Box p={1}><Chip style={chipStyle}>{`Wind speed: ${weatherValues.get('ws')} m/s`}</Chip></Box> */}
            <Box p={1}><Chip labelStyle={labelSmall}>
              Humidity: {weatherValues.get('r')} %
            </Chip></Box>
            <Box p={1}><Gauge
              value={weatherValues.get('t')}
              {...tempGaugeOptions}
            /></Box>
            {/* <Box p={2}><Chip style={chipStyle} labelStyle={chipStyle}>(humidity)</Chip></Box> */}
          </Flex>
          : <Flex align="center" justify="center">
            <Box p={1}><Chip>{'No data'}</Chip></Box>
          </Flex>
        }
      </div>
    );
  }
}

export default Weather;
