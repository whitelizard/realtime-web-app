import React from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';

const contentHeight = 332;
const titleInnerHeight = 36;
const titlePadding = 16;
const titleHeight = titleInnerHeight + titlePadding * 2;

const cardStyle = {
  position: 'relative',
  display: 'inline-block',
  marginBottom: 25,
  marginRight: 25,
};

const titleStyle = {
  position: 'absolute',
  height: titleInnerHeight,
  padding: titlePadding,
  fontWeight: 100,
};

const contentStyle = {
  position: 'absolute',
  top: titleHeight,
  overflow: 'hidden',
};

export default class Widget extends React.Component {
  static propTypes = {
    config: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number,
    children: React.PropTypes.node.isRequired,
  };
  static defaultProps = {
    height: contentHeight,
  };

  constructor(props) {
    super(props);
    const { width, height, config } = props;
    this.cardStyle = {
      ...cardStyle,
      height: height + titleHeight,
    };
    this.contentStyle = {
      ...contentStyle,
      width,
      height: height || contentHeight,
    };
    if (config.has('contentStyle')) {
      this.contentStyle = { ...this.contentStyle, ...config.get('contentStyle').toJS() };
    }
  }

  render() {
    const { config, width, children } = this.props;

    return (
      <Card style={{ ...this.cardStyle, width }} key={`${config.get('title', Date.now())}`}>
        <CardTitle
          style={{ ...titleStyle, width: width - 2 * titlePadding }}
          title={config.get('title', 'Untitled')}
        />
        <CardMedia style={{ ...this.contentStyle, width, textAlign: 'center' }}>
          {children}
        </CardMedia>
      </Card>
    );
  }
}
