import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import t from '../services/i18n';
import i18n from '../i18n';

export default class SelectLang extends React.Component {
  static propTypes = {
    active: React.PropTypes.string.isRequired,
    setLang: React.PropTypes.func.isRequired,
  };
  static contextTypes = {
    lang: React.PropTypes.string.isRequired,
  };

  onChange = (ev, i, v) => {
    this.props.setLang(v);
  };

  render() {
    const { active } = this.props;
    const l = this.context.lang;

    return (
      <SelectField
        floatingLabelText={t(l, 'label', 'changeLanguage')}
        value={active}
        onChange={this.onChange}
        maxHeight={500}
      >
        {Object.keys(i18n).map(l => <MenuItem value={l} key={l} primaryText={l} />)}
      </SelectField>
    );
  }
}
