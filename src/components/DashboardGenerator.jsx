import React from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';
import Widget from './widgets/Widget';
import PositionMap from './widgets/PositionMap';
import RealtimeGraph from './widgets/RealtimeGraph';
import Climate from './widgets/Climate';
import Weather from '../containers/widgets/Weather';
import Notifications from './widgets/Notifications';
import Image from './widgets/Image';
import { medium } from '../styles/responsiveness';

const defaultCardWidth = 300;
const wideCardWidth = 625;
const cardContentHeight = 332;

export default class DashboardGenerator extends React.Component {
  static propTypes = {
    cardsConfig: IPropTypes.list,
    channels: IPropTypes.map.isRequired,
    windowSize: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  };
  static defaultProps = {
    cardsConfig: List(),
  };

  channelData(channel, path = [], defaultValue) {
    const { channels } = this.props;
    return channels.getIn([channel, 'messages'].concat(path), defaultValue);
  }

  climateBuilder(card, index) {
    return (
      <Widget config={card} index={index} width={defaultCardWidth}>
        <Climate
          temperature={this.channelData(card.getIn(['channels', 0]), [-1, 'payload', 0])}
          humidity={this.channelData(card.getIn(['channels', 1]), [-1, 'payload', 0])}
        />
      </Widget>
    );
  }

  weatherBuilder(card, index) {
    return (
      <Widget config={card} index={index} width={defaultCardWidth}>
        <Weather
          position={this.channelData(card.getIn(['channels', 0]), [-1, 'payload'], List())}
        />
      </Widget>
    );
  }

  imageBuilder(card, index) {
    return (
      <Widget config={card} index={index} width={defaultCardWidth}>
        <Image
          src={this.channelData(card.getIn(['channels', 0]), [-1, 'payload', 0], '')}
          width={defaultCardWidth}
          height={cardContentHeight}
        />
      </Widget>
    );
  }

  lineGraphBuilder(card, index, width) {
    const conf = card.get('config');
    return (
      <Widget config={card} index={index} width={width}>
        <RealtimeGraph
          point={this.channelData(card.getIn(['channels', 0]), [-1], Map())}
          config={conf.set('width', width - 10).set('height', cardContentHeight - 10)}
          timeWindowMs={card.get('timeWindowMs')}
          width={width}
        />
      </Widget>
    );
  }

  locationBuilder = (card, index, width) => (
    <Widget config={card} index={index} width={width}>
      <PositionMap
        messages={this.channelData(card.getIn(['channels', 0]), [], List())}
        width={width}
        height={cardContentHeight}
      />
    </Widget>
  );

  notificationBuilder = (card, index, width) => (
    <Widget config={card} index={index} width={width}>
      <Notifications
        data={this.channelData(card.getIn(['channels', 0]), [], List())}
        width={width}
      />
    </Widget>
  );

  render() {
    const { windowSize } = this.props;
    const cardWidth = windowSize.width > medium ? wideCardWidth : defaultCardWidth;
    return (
      <div>
        {this.props.cardsConfig.map((card, index) =>
          this[`${card.get('widget')}Builder`](card, index, cardWidth))}
      </div>
    );
  }
}
