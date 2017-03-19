import TiipSession from 'tiip-client-js';

export const defaultUrl = secure => `${secure ? 'wss' : 'ws'}://${location.host}/wsh`;

const session = new TiipSession();

export function isRid(s) {
  return /#[0-9]+:[0-9]+/.test(s);
}

export function cleanRid(rid) {
  return rid.replace(/#/g, '').replace(/:/g, '-');
}

export function routeToRid(id) {
  return `#${id.replace(/-/g, ':')}`;
}

export function ridListToMap(list) {
  return list.toMap().mapKeys((key, v) => v.get('rid'));
}

export function listToMapOfRoutables(list) {
  return ridListToMap(list).map(o => o.set('__urlFriendlyId', cleanRid(o.get('rid'))));
}

const requests = {
  changePassword: (currentPassword, newPassword) => [
    'conf',
    'changePassword',
    { currentPassword, newPassword },
  ],
  readProfile: () => ['conf', 'readProfile'],
  getWeatherData: (lat, lon) => ['weather', 'getWeatherData', { lat, lon }],
};

/**
 * Make one of the preset requests
 * @param  {String}  id      ID of desired request
 * @param  {Array}  preArgs  Possible arguments to that request + possible post processing func
 * @return {Promise}         Promise with reply payload as resolve value
 * @example
req('readAsset', rid, listToMapOfRoutables);
 */
export const request = async (id, ...args) => {
  let postFunc;
  const last = args[args.length - 1];
  if (typeof last === 'function') {
    postFunc = last;
    args.pop();
  }
  const reply = await session.socket.req(...requests[id](...args));
  return postFunc ? postFunc(reply.get('payload')) : reply.get('payload');
};

export default session;
