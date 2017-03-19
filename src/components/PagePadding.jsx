import React from 'react';

export default class PagePadding extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
  }

  render() {
    return (
      <div style={{ paddingLeft: 15, paddingRight: 15 }}>
        {this.props.children}
      </div>
    );
  }
}
