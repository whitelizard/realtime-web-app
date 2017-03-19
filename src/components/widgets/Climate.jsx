import React from 'react';
import { Flex, Box } from 'reflexbox';
import Chip from 'material-ui/Chip';
// import t from '../../services/i18n';

const labelBig = {
  background: '#fff',
  fontSize: 48,
};

const labelSmall = {
  background: '#fff',
};

class Climate extends React.PureComponent {
  static propTypes = {
    temperature: React.PropTypes.number.isRequired,
    humidity: React.PropTypes.number.isRequired,
  };

  render() {
    const { temperature, humidity } = this.props;
    // const weatherValues = selectedWeatherValues(getWeatherNowAsMap(weather));
    // console.log('Weather:render, weatherValues', weatherValues.toJS());
    // const l = this.context.lang;

    return (
      <div>
        <Flex column justify="center" align="center">
          <Box p={3}>
            <Chip labelStyle={labelBig}>
              {temperature !== -300 ? temperature.toFixed(1) : '-'} °C
            </Chip>
          </Box>
          {humidity !== -1 &&
            <Box p={1}>
              <Chip labelStyle={labelSmall}>
                Humidity: {humidity.toFixed(0)} %
              </Chip>
            </Box>}
        </Flex>
      </div>
    );
  }
}

export default Climate;
