import React from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import Formsy from 'formsy-react';
import { FormsyText } from 'formsy-material-ui/lib';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import gravatar from 'gravatar';
import history from '../app-history';
import '../services/formsy';
import Page from '../components/Page';
import PagePadding from '../components/PagePadding';
import SelectLang from '../containers/SelectLang';
import CancelSave from './CancelSave';
import t from '../services/i18n';

export default class ProfilePage extends React.Component {
  static propTypes = {
    profile: IPropTypes.mapOf(React.PropTypes.string).isRequired,
    openSnackbar: React.PropTypes.func.isRequired,
    updatePassword: React.PropTypes.func.isRequired,
  };

  static contextTypes = {
    lang: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.avatarUrl = gravatar.url(props.profile.get('id'), { s: '200', r: 'pg', d: 'mm' });
  }

  submit = (data) => {
    const { updatePassword } = this.props;
    const currentPassword = data.oldw;
    const newPassword = data.pw;
    updatePassword(currentPassword, newPassword);
    this.pwForm.reset();
  };

  notifyFormError = () => {
    this.props.openSnackbar(fromJS({ msgs: { submitError: {} }, isError: true }));
  };

  render() {
    const { profile } = this.props;
    const l = this.context.lang;

    return (
      <Page title={t(l, 'label', 'profilePage')}>
        <PagePadding>
          <h2 style={{ marginBottom: 0 }}>{profile.get('name')}</h2>
          <small>{profile.get('id')}</small>
          <Divider style={{ marginTop: 10 }} />
          <Avatar style={{ marginTop: 10 }} size={90} src={this.avatarUrl} />
          <br />
          <SelectLang />
          <br />
          <Formsy.Form
            ref={(c) => {
              this.pwForm = c;
            }}
            onValidSubmit={this.submit}
            onInvalidSubmit={this.notifyFormError}
          >
            <FormsyText
              required
              name="oldPw"
              type="password"
              floatingLabelText={t(l, 'label', 'currentPassword')}
              validations={{
                minLength: 4,
              }}
              validationError={t(l, 'msg', 'stringLengthError', { num: 4 })}
            />
            <br />
            <FormsyText
              required
              name="pw"
              type="password"
              floatingLabelText={t(l, 'label', 'newPassword')}
              validations={{
                minLength: 4,
              }}
              validationError={t(l, 'msg', 'stringLengthError', { num: 4 })}
            />
            <br />
            <FormsyText
              required
              name="confirmPw"
              type="password"
              floatingLabelText={t(l, 'label', 'confirmPassword')}
              validations={{
                equalsField: 'pw',
              }}
              validationError={t(l, 'msg', 'passwordMissmatch')}
            />
            <CancelSave onCancel={history.goBack} />
          </Formsy.Form>
        </PagePadding>
      </Page>
    );
  }
}
