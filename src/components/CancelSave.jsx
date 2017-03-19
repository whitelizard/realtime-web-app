import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import t from '../services/i18n';

export default class CancelSave extends React.Component {
  static propTypes = {
    onCancel: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    lang: React.PropTypes.string.isRequired,
  };

  render() {
    const { onCancel, ...rest } = this.props;
    const l = this.context.lang;

    return (
      <div style={{ paddingTop: 20, paddingBottom: 20 }} {...rest}>
        <RaisedButton
          label={t(l, 'label', 'cancel')}
          onTouchTap={onCancel}
          style={{ marginRight: 20 }}
        />
        <RaisedButton label={t(l, 'label', 'save')} primary type="submit" />
      </div>
    );
  }
}
