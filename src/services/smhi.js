import { fromJS, List, Map } from 'immutable';
import uuid from 'node-uuid';

/**
 * Will not work from a https site at the moment. Come back later!
 */

const domain = 'opendata-download-metfcst.smhi.se';
const url = `http://${domain}/api/category/pmp2g/version/2/geotype/point`;

const desiredData = fromJS(['t', 'ws', 'r']);

export const getWeatherNowAsMap = (weatherObject) => {
  const hNow = (new Date()).getHours();
  if (!weatherObject) return Map();
  return weatherObject
    .find(atTime => (new Date(atTime.get('validTime'))).getHours() === hNow, this, Map())
    .get('parameters', List())
    .toMap()
    .mapKeys((k, v) => v.get('name', uuid.v4()));
};

export const selectedWeatherValues = (valueMap) => {
  if (!valueMap) return Map();
  return valueMap
    .filter((v, k) => desiredData.includes(k))
    .map(v => v.getIn(['values', 0], ''));
};

export const weatherAt = (lat, lon) =>
  fetch(`${url}/lon/${lon.toFixed(3)}/lat/${lat.toFixed(3)}/data.json`)
    .then(reply => reply.json())
    .then(data => fromJS(data).get('timeSeries', List()));

export const selectedWeatherValuesNowAt = (lat, lon) =>
  weatherAt(lat, lon).then(timeSeries =>
    selectedWeatherValues(getWeatherNowAsMap(timeSeries)));
