import React, { PropTypes } from 'react';
import Dygraph from 'dygraphs';
import IPropTypes from 'react-immutable-proptypes';
import { fromJS, List } from 'immutable';
import { Style } from 'radium';

const defaultConfig = fromJS({
  drawPoints: true,
  pointSize: 3,
  highlightCircleSize: 5,
  axisLineWidth: 1,
  strokeWidth: 2,
  axisLineColor: 'rgb(255,255,255)',
  gridLineColor: 'rgb(200,200,200)',
  labels: ['Time', 'Values'],
});

function setWithin(data, timeWindowMs) {
  const oldestAllowed = data.last().get(0) - timeWindowMs * 2;
  return data.skipUntil(point => point.get(0) >= oldestAllowed);
}

export default class RealtimeGraph extends React.Component {
  static propTypes = {
    config: PropTypes.objectOf(PropTypes.any).isRequired,
    width: PropTypes.number.isRequired,
    point: IPropTypes.map.isRequired,
    timeWindowMs: PropTypes.number,
  };
  static defaultProps = {
    timeWindowMs: 1000 * 60,
  };

  constructor(props) {
    super(props);
    this.data = List();
    this.lastDataTimestamp = 0;
  }

  componentDidMount() {
    const { config, timeWindowMs } = this.props;
    const conf = defaultConfig.mergeDeep(config).toJS();
    this.timeWindowMs = timeWindowMs;
    this.graph = new Dygraph(this.area, [[new Date(), 0]], conf);
    this.area.onmouseover = () => {
      cancelAnimationFrame(this.animationFrameId);
    };
    this.area.onmouseout = () => {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = requestAnimationFrame(this.animate);
    };
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  shouldComponentUpdate(nextProps) {
    const { config, point, width } = nextProps;
    if (point && point.get('timestamp') > this.lastDataTimestamp) {
      this.lastDataTimestamp = point.get('timestamp');
      this.data = setWithin(
        this.data.push(point.get('payload').unshift(new Date())),
        this.timeWindowMs,
      );
      this.graph.updateOptions({ file: this.data.toJS() });
    } else {
      this.graph.updateOptions(config.toJS());
    }
    if (width !== this.props.width) return true;
    return false;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }

  animate = () => {
    this.graph.updateOptions({ dateWindow: [new Date() - this.timeWindowMs, new Date()] });
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  render() {
    const { width } = this.props;
    return (
      <div>
        <Style
          rules={{
            '.dygraph-legend': {
              fontFamily: 'Roboto, sans-serif',
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
              borderRadius: 2,
              padding: '1px 3px',
              background: '#fff',
              zIndex: 1050,
            },
            '.dygraph-axis-label': {
              color: '#777777',
            },
          }}
        />
        <div
          ref={(c) => {
            this.area = c;
          }}
          style={{ width }}
        />
      </div>
    );
  }
}
