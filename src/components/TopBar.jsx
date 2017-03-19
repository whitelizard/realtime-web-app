import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import withContentSize from 'react-material-ui-extras/lib/withContentSize';

class TopBar extends React.Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    showMenuButton: PropTypes.bool,
    toggleMenu: PropTypes.func,
    loading: PropTypes.bool,
    contentWidth: PropTypes.number.isRequired,
  };
  static defaultProps = {
    showMenuButton: true,
    title: '',
    loading: false,
    toggleMenu: Function.prototype,
  };

  toggleMenu = () => {
    console.log('menu hamburger tap');
    this.props.toggleMenu();
  };

  render() {
    const { title, showMenuButton, contentWidth, loading } = this.props;

    const loadingDivStyle = {
      width: contentWidth,
      position: 'fixed',
      zIndex: 1200,
      height: 0,
      textAlign: 'center',
    };
    console.log(showMenuButton);
    return (
      <div>
        <AppBar
          style={{ position: 'fixed', overflow: 'visible' }}
          title={title}
          showMenuIconButton={showMenuButton}
          onLeftIconButtonTouchTap={this.toggleMenu}
        />
        {loading &&
          <div style={loadingDivStyle}>
            <CircularProgress color="white" style={{ marginTop: 10, display: 'inline-block' }} />
          </div>}
      </div>
    );
  }
}
export default withContentSize(TopBar);
