import React from 'react';
import IPropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import { MenuItem, Menu } from 'material-ui/Menu';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Avatar from 'material-ui/Avatar';
import MuiIcon from 'react-material-ui-extras/lib/MuiIcon';
import gravatar from 'gravatar';
import { menuItems } from '../AppRouter';
import t from '../services/i18n';

const linkStyle = { color: 'inherit', textDecoration: 'none' };
const profileStyle = { padding: 12, borderRadius: 0 };
const nameStyle = { display: 'inline-block', marginLeft: 14, verticalAlign: 'super' };

class AppDrawer extends React.Component {
  static propTypes = {
    menuOpen: React.PropTypes.bool.isRequired,
    mobileResolution: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func.isRequired,
    toggleMenu: React.PropTypes.func.isRequired,
    profile: IPropTypes.map,
    routing: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
    muiTheme: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
  };
  static contextTypes = {
    lang: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    profile: undefined,
  };

  componentWillUpdate(nextProps) {
    if (nextProps.menuOpen !== this.props.menuOpen && !nextProps.mobileResolution) {
      this.createResizeEvent();
    }
  }

  componentWillUnmount() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
  }

  createResizeEvent = () => {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(
      () => {
        window.dispatchEvent(new Event('resize'));
      },
      480,
    );
  };

  logout = () => this.props.logout();

  render() {
    const { profile, menuOpen, routing, mobileResolution, muiTheme, toggleMenu } = this.props;
    if (!profile) return false;
    const l = this.context.lang;
    const url = gravatar.url(profile.get('id'), { s: '200', r: 'pg', d: 'mm' });

    const activeIndex = menuItems.reduce(
      (r, v, index) => {
        if (r + 1) return r;
        const current = `/${routing.locationBeforeTransitions.pathname}`;
        return v.has('link') && current === v.get('link') ? index : -1;
      },
      -1,
    );

    const accent1Color = muiTheme.palette.accent1Color;
    const activeStyle = {
      color: accent1Color,
      fontWeight: 'bold',
    };

    return (
      <Drawer
        open={menuOpen || !mobileResolution}
        containerStyle={{ overflowX: 'hidden' }}
        docked={!mobileResolution}
        onRequestChange={toggleMenu}
      >
        <Paper style={profileStyle}>
          <Link to="/profile" style={linkStyle}>
            <Avatar src={url} size={45} />
            <div style={nameStyle}>
              {profile.get('name', 'Noname')}<br />
              <small>{profile.get('id', 'Unknown')}</small>
            </div>
          </Link>
        </Paper>
        <Menu width={muiTheme.drawer.width} autoWidth={false}>
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;
            const label = item.get('label');
            const icon = item.get('icon', 'stop');
            const link = item.get('link');
            const action = item.get('action');
            return (
              <MenuItem
                key={`menuItem${label}`}
                containerElement={link ? <Link to={link} /> : 'span'}
                onTouchTap={action ? this[action] : null}
                leftIcon={
                  isActive
                    ? <MuiIcon plain color={accent1Color} icon={icon} />
                    : <MuiIcon plain icon={icon} />
                }
                style={isActive ? activeStyle : {}}
              >
                {t(l, 'label', label)}
              </MenuItem>
            );
          })}
        </Menu>
      </Drawer>
    );
  }
}

export default muiThemeable()(AppDrawer);
