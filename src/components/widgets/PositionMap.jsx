import React from 'react';
import { List } from 'immutable';
import L from 'leaflet';
import { Map, TileLayer, Marker, Polyline } from 'react-leaflet';
import iconImg from '../../images/place_black_1.png';
import iconShadow from '../../images/marker-shadow.png';

const defaultCenter = [57, 1];

const iconCommon = {
  iconAnchor: [24, 43],
  iconSize: [48, 48],
  shadowUrl: iconShadow,
  shadowAnchor: [13, 39],
  shadowSize: [41, 41],
  popupAnchor: [0, -50],
};
const posIcon = L.icon({ iconUrl: iconImg, ...iconCommon });

export default class PositionMap extends React.Component {
  static propTypes = {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    messages: React.PropTypes.objectOf(React.PropTypes.object),
  };
  static defaultProps = {
    messages: List(),
  };

  render() {
    const { width, height, messages } = this.props;
    const positions = messages.map(d => d.get('payload', List()));
    const position = !positions.isEmpty() && positions.get(-1).toJS();
    const points = positions.map(p => new L.LatLng(p.get(0), p.get(1))).toJS();
    return (
      <Map style={{ width, height }} center={position || defaultCenter} zoom={position ? 12 : 2}>
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        {position && <Marker position={position} icon={posIcon} />}
        <Polyline positions={points} />
      </Map>
    );
  }
}
