import React from 'react';
import { Flex, Box } from 'reflexbox';

export default class VideoGraph extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    src: React.PropTypes.string.isRequired,
  };

  render() {
    const { width, height, src } = this.props;

    return (
      <Flex align="center" style={{ height, background: 'black' }}>
        <Box><img src={src} style={{ width }} /></Box>
      </Flex>
    );
  }
}
