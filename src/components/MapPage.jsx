import React, { PropTypes } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import withContentSize from 'react-material-ui-extras/lib/withContentSize';
import t from '../services/i18n';
import Page from '../components/Page';

const defaultCenter = [57, 1];

class MapPage extends React.Component {
  static propTypes = {
    contentHeight: PropTypes.number.isRequired,
  };
  static contextTypes = {
    lang: PropTypes.string.isRequired,
  };
  render() {
    const { contentHeight } = this.props;
    const l = this.context.lang;
    return (
      <Page title={t(l, 'label', 'mapOverview')} bottomSpace={false}>
        <LeafletMap style={{ height: contentHeight }} center={defaultCenter} zoom={3}>
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        </LeafletMap>
      </Page>
    );
  }
}

export default withContentSize(MapPage);
