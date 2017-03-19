import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import config from '../app-config';
import session, { request } from '../services/session';

const snackbarDefaults = {
  open: false,
  textLines: {},
  duration: 4000,
  isError: false,
};

const defaultState = fromJS({
  menuOpen: false,
  loading: false,
  i18n: config.i18n.default || 'en',
  snackbar: snackbarDefaults,
  /*
   * snackbar.textLines should look like (immutable):
   * { <insert tId>:
   *    { variable1: 'varValue1', variable2: 'varValue2'}, editSomething: { name: 'Thing' },
   * }
   */
  weather: {},
});

let loadTimer;
let timeoutTimer;

// ================================================================================================
//  ACTIONS TO REDUCE ON

export const toggleMenu = createAction('app/TOGGLEMENU');
export const hideMenu = createAction('app/HIDEMENU');
export const setLoading = createAction('app/SETLOADING');
export const openSnackbar = createAction('app/SNACKBAROPEN');
export const closeSnackbar = createAction('app/SNACKBARCLOSE');
export const updateI18n = createAction('app/UPDATEI18N');
const updateWeather = createAction('app/UPDATEWEATHER');

// ================================================================================================
//  COMPLEX ACTIONS

export const tryLoadingOff = () =>
  (dispatch) => {
    console.log(
      'reqCallbacks:',
      session.socket.reqCallbacks.toJS
        ? session.socket.reqCallbacks.toJS()
        : session.socket.reqCallbacks,
    );
    if (session.socket.reqCallbacks.isEmpty()) {
      // guard is not enough, we also need to use a timer in order for the indicator to keep
      // animating smoothly when multiple calls are done in a chain
      if (loadTimer) clearTimeout(loadTimer);
      loadTimer = setTimeout(() => dispatch(setLoading(false)), 200);
    } else {
      if (loadTimer) clearTimeout(loadTimer);
      loadTimer = setTimeout(() => dispatch(tryLoadingOff()), 500);
      if (timeoutTimer) clearTimeout(timeoutTimer);
      timeoutTimer = setTimeout(() => dispatch(setLoading(false)), 10000);
    }
  };

export const req = (id, ...args) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const reply = await request(id, ...args);
      return reply;
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch(tryLoadingOff());
    }
  };

export const fetchWeather = (lat, lon) =>
  async (dispatch) => {
    const wd = await dispatch(req('getWeatherData', lat, lon));
    dispatch(updateWeather(fromJS(wd)));
  };

// ================================================================================================
// REDUCER

export default handleActions(
  {
    [toggleMenu]: state => state.set('menuOpen', !state.get('menuOpen')),

    [hideMenu]: state => state.set('menuOpen', false),

    [setLoading]: (state, action) => state.set('loading', action.payload),

    [closeSnackbar]: state => state.setIn(['snackbar', 'open'], false),

    [openSnackbar]: (state, action) =>
      state.mergeIn(['snackbar'], fromJS(snackbarDefaults).merge(action.payload)),

    [updateI18n]: (state, action) => state.set('i18n', action.payload),

    [updateWeather]: (state, action) => state.set('weather', action.payload),
  },
  defaultState,
);
