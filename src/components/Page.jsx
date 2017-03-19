import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { Link } from 'react-router';
import muiThemeable from 'material-ui/styles/muiThemeable';
import withContentSize from 'react-material-ui-extras/lib/withContentSize';
import TopBar from '../containers/TopBar';
import { medium } from '../styles/responsiveness';

const containerStyle = {
  position: 'relative',
};

const contentBottomSpace = {
  paddingBottom: 100,
};

class Page extends React.PureComponent {
  static propTypes = {
    title: PropTypes.node,
    titleLink: PropTypes.string,
    children: PropTypes.node.isRequired,
    bottomSpace: PropTypes.bool,
    muiTheme: PropTypes.objectOf(PropTypes.any).isRequired,
    // showMenuButton: PropTypes.bool,
    contentWidth: React.PropTypes.number.isRequired,
  };
  static defaultProps = {
    title: '',
    titleLink: undefined,
    bottomSpace: true,
    // showMenuButton: true,
  };
  static contextTypes = {
    lang: PropTypes.string.isRequired,
  };

  render() {
    const {
      title,
      titleLink,
      children,
      bottomSpace,
      // showMenuButton,
      muiTheme,
      contentWidth,
    } = this.props;

    return (
      <DocumentTitle title={title}>
        <div>
          <TopBar
            title={titleLink ? <Link to={titleLink}>{title}</Link> : title}
            showMenuButton={contentWidth < medium}
            style={containerStyle}
          />
          <div
            style={{
              paddingTop: muiTheme.appBar.height,
              ...containerStyle,
              ...(bottomSpace ? contentBottomSpace : {}),
            }}
          >
            {children}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default withContentSize(muiThemeable()(Page));
