import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { red200 } from 'material-ui/styles/colors';
import t from '../services/i18n';

const marginStyle = {
  marginLeft: 10,
};

export default class LoginForm extends React.PureComponent {

  static propTypes = {
    auth: PropTypes.func.isRequired,
    serverAddress: PropTypes.string.isRequired,
    loginErrorMsgId: PropTypes.string.isRequired,
  }
  static contextTypes = {
    lang: PropTypes.string.isRequired,
  }

  onConnectPress = () => {
    this.props.auth(
      this.serverAddress.input.value,
      this.tenant.input.value,
      this.userId.input.value,
      this.passphrase.input.value,
    );
  }

  render() {
    const { loginErrorMsgId, serverAddress } = this.props;
    const l = this.context.lang;
    return (
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <TextField
          floatingLabelText={t(l, 'label', 'serverAddress')}
          defaultValue={serverAddress}
          style={marginStyle}
          ref={c => this.serverAddress = c} // eslint-disable-line
        />
        <TextField
          floatingLabelText={t(l, 'label', 'tenant')}
          style={marginStyle}
          ref={c => this.tenant = c} // eslint-disable-line
        />
        <TextField
          type="email"
          floatingLabelText={t(l, 'label', 'userId')}
          style={marginStyle}
          ref={c => this.userId = c} // eslint-disable-line
        />
        <TextField
          type="password"
          floatingLabelText={t(l, 'label', 'passphrase')}
          style={marginStyle}
          ref={c => this.passphrase = c} // eslint-disable-line
        />
        {loginErrorMsgId &&
          <Chip style={{ background: red200, display: 'inline-block' }}>
            {t(l, 'msg', loginErrorMsgId)}
          </Chip>
        }
        <RaisedButton
          label={t(l, 'label', 'login')}
          style={{ ...marginStyle, marginTop: 20 }}
          onTouchTap={this.onConnectPress}
        />
      </div>
    );
  }
}
