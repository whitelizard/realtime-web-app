import React from 'react';
import moment from 'moment';
import { fromJS } from 'immutable';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MuiIcon from 'react-material-ui-extras/lib/MuiIcon';
import t from '../../services/i18n';

const severityMap = fromJS({
  none: { icon: 'chat_bubble_outline' },
  minor: { icon: 'announcement' },
  major: { icon: 'warning', color: 'orange' },
  critical: { icon: 'report', color: 'red' },
});

export default class Notifications extends React.Component {
  static propTypes = {
    messages: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
    width: React.PropTypes.number.isRequired,
  };

  static contextTypes = {
    lang: React.PropTypes.string.isRequired,
  };

  renderNotification(item) {
    const l = this.context.lang;
    const sig = item.get('signal', 'unknown');
    const data = item.getIn(['payload', 0]);
    const iConf = severityMap.get('minor');
    return (
      <div>
        <Divider />
        <ListItem
          key={item.get('timestamp')}
          primaryText={t(l, 'label', sig, { selector: data }, data ? `${sig}: ${data}` : sig)}
          secondaryTextLines={1}
          secondaryText={
            <p>
              {moment(item.get('timestamp')).calendar()}<br />
            </p>
          }
          leftIcon={<MuiIcon icon={iConf.get('icon', 'announcement')} color={iConf.get('color')} />}
          style={{ textAlign: 'left' }}
        />
      </div>
    );
  }

  render() {
    const { width, messages } = this.props;
    return (
      <div style={{ width }}>
        <List>
          {messages && messages.reverse().map(item => this.renderNotification(item))}
        </List>
      </div>
    );
  }
}
