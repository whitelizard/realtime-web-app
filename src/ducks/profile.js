import { fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import path from 'path';
import history from '../app-history';
import session, { defaultUrl } from '../services/session';
import { req, openSnackbar } from './app';
import conf from '../app-config';

const defaultState = fromJS({
  serverAddress: conf.backend.serverAddress || defaultUrl(true),
  loginErrorMsgId: '',
  profile: {},
});

// ================================================================================================
//  ACTIONS TO REDUCE ON

const setProfile = createAction('app/PROFILE');
const setLoginErrorMsgId = createAction('app/LOGINERRORMSGID');

// ================================================================================================
//  COMPLEX ACTIONS

export const logout = switchUser =>
  (dispatch) => {
    session.logout();
    if (!switchUser) history.replace(path.join(conf.basename, 'login'));
    else dispatch(setProfile({ profile: {} }));
  };

export const init = (nextState, replace, done) =>
  async (dispatch, getState) => {
    if (session.authenticated) {
      if (done) done(); // all good
    } else {
      try {
        session.connect(getState().profile.get('serverAddress'));
        await session.init();
        const profileReply = await dispatch(req('readProfile'));
        dispatch(setProfile({ profile: profileReply.get(0) }));
      } catch (err) {
        // history.push('/login', { next }); // keep history, go to /login, all good
        replace({
          state: { next: nextState.location.pathname },
          pathname: '/login',
        });
      } finally {
        if (done) done();
      }
    }
  };

export const auth = (serverAddress, tenant, userId, passphrase) =>
  async (dispatch, getState) => {
    const { state } = getState().routing.locationBeforeTransitions;
    const next = conf.defaultPage || (state && state.next) || '/';
    if (session.authenticated) {
      // logged in
      if (getState().profile.getIn(['profile', 'id'], '') === userId) {
        // as myself
        history.push(next);
      }
      dispatch(logout(true));
    }
    try {
      session.connect(serverAddress);
      await session.auth(userId, passphrase, tenant);
      const profileReply = await dispatch(req('readProfile'));
      dispatch(setProfile({ profile: profileReply.get(0), serverAddress }));
      history.push(next); // all good now, go to where user desired
    } catch (err) {
      dispatch(setLoginErrorMsgId('authFailed'));
    }
  };

export const updatePassword = (currentUnhashed, newUnhashed) =>
  async (dispatch) => {
    const currentPassword = session.hashify(currentUnhashed);
    const newPassword = session.hashify(newUnhashed);
    try {
      const changeReply = await req('changePassword', currentPassword, newPassword);
      if (changeReply) {
        dispatch(openSnackbar(fromJS({ msgs: { updateSuccess: { item: 'password' } } })));
      }
    } catch (err) {
      dispatch(
        openSnackbar(
          fromJS({
            isError: true,
            duration: 8000,
            msgs: { updateFail: { item: 'password' } },
          }),
        ),
      );
    }
  };

// ================================================================================================
// REDUCER /////////////////////////////////

export default handleActions(
  {
    [setProfile]: (state, action) =>
      state.withMutations(map =>
        map
          .set('profile', action.payload.profile)
          .set('serverAddress', action.payload.serverAddress || state.get('serverAddress'))),

    [setLoginErrorMsgId]: (state, action) => state.set('loginErrorMsgId', action.payload),
  },
  defaultState,
);
