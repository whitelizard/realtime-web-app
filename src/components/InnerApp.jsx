import React, { PropTypes } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppDrawer from '../containers/AppDrawer';
import { large } from '../styles/responsiveness';

const style = {
  content: {
    transition: 'padding 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    paddingLeft: 0,
  },
  inner: {
    position: 'relative',
  },
};

class InnerApp extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    windowSize: PropTypes.objectOf(PropTypes.number).isRequired,
    muiTheme: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  render() {
    const { children, windowSize, muiTheme } = this.props;
    const mobileResolution = windowSize.width < large;

    return (
      <div>
        <AppDrawer mobileResolution={mobileResolution} />
        <main
          style={{
            ...style.content,
            ...(!mobileResolution ? { paddingLeft: muiTheme.drawer.width } : {}),
          }}
        >
          <div style={style.inner}>
            {children}
          </div>
        </main>
      </div>
    );
  }
}

export default muiThemeable()(InnerApp);
