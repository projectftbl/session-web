import assign from 'lodash/object/assign';
import Facebook from 'facia';
import { RESOURCE } from '@ftbl/resource';
import { config, dialog } from '@ftbl/support'

export const RELOAD = 'ftbl/session/session/RELOAD';
export const RELOAD_SUCCESS = 'ftbl/session/session/RELOAD_SUCCESS';
export const RELOAD_FAILED = 'ftbl/session/session/RELOAD_FAILED';
export const SIGN_ON = 'ftbl/session/session/SIGN_ON';
export const SIGN_ON_SUCCESS = 'ftbl/session/session/SIGN_ON_SUCCESS';
export const SIGN_ON_FAILED = 'ftbl/session/session/SIGN_ON_FAILED';
export const SIGN_OUT = 'ftbl/session/session/SIGN_OUT';
export const SIGN_OUT_SUCCESS = 'ftbl/session/session/SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILED = 'ftbl/session/session/SIGN_OUT_FAILED';
export const VERIFY = 'ftbl/session/session/VERIFY';
export const VERIFY_SUCCESS = 'ftbl/session/session/VERIFY_SUCCESS';
export const VERIFY_FAILED = 'ftbl/session/session/VERIFY_FAILED';
export const UPDATE = 'ftbl/session/session/UPDATE';

const initialState = { 
  user: null
, error: null
, isSigningOn: false
, isSigningOut: false
, isReloading: false
, facebook: new Facebook({ appId: config('facebook').ID, version: 'v2.5', scope: config('facebook').SCOPE })
};

const ERRORS = {
  404: 'Invalid credentials, please try again'
, 522: 'Validation error'
, 500: 'Server error'
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case RELOAD:
    return assign({}, state, { isReloading: true });
  case VERIFY:
  case SIGN_ON:
    return assign({}, state, { isSigningOn: true });

  case SIGN_OUT:
    return assign({}, state, { isSigningOut: true });

  case SIGN_ON_SUCCESS:
  case VERIFY_SUCCESS:
  case RELOAD_SUCCESS:
    return assign({}, state, { error: null, user: action.payload.session, isSigningOn: false, isReloading: false });

  case SIGN_ON_FAILED:
    return assign({}, state, { error: ERRORS[action.payload.status], isSigningOn: false })

  case SIGN_OUT_SUCCESS:
  case SIGN_OUT_FAILED:
  case RELOAD_FAILED:
  case VERIFY_FAILED:
    return assign({}, state, { user: null, error: null, isSigningOn: false, isSigningOut: false, isReloading: false });

  case UPDATE: 
    return assign({}, state, { user: action.payload.user });

  default:
    return state;
  }
};

export function signOnReducer(state, action) {
  switch(action.type) {
  case SIGN_ON_FAILED:
    return { ...state, password: {}};
  default:
    return state;
  }
};

export function reloadSession(options = { forceRefresh: false, redirect: true }) {
  return {
    [RESOURCE]: {
      types: [ RELOAD, RELOAD_SUCCESS, RELOAD_FAILED ]
    , payload: {
        url: '/sessions', method: options.forceRefresh ? 'put' : 'get'
      }
    , meta: options
    }
  };  
};

export function signOn(authentication) {
  return {
    [RESOURCE]: {
      types: [ SIGN_ON, SIGN_ON_SUCCESS, SIGN_ON_FAILED ]
    , payload: {
        url: '/sessions', method: 'post', data: { authentication: authentication }
      }
    }
  };
};

export function signOut(id, options = { redirect: true }) {
  return {
    [RESOURCE]: {
      types: [ SIGN_OUT, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED ]
    , payload: {
        url: `/sessions/${id}`, method: 'del'
      }
    , meta: options
    }
  };
};

export function signOnToFacebook() {
  return (dispatch, getState) => {
    const { session: { facebook }} = getState();
  
    dispatch({ type: SIGN_ON });

    facebook.login().then(
      authentication => {
        authentication.provider = 'facebook';
        dispatch(signOn(authentication));
      }
    , error => {
        dispatch({ type: SIGN_ON_FAILED, payload: { statusText: '', status: 400 }});
      });
  };
};

function signOnToNetwork(network) {
  return (dispatch, getState) => {
    dispatch({ type: SIGN_ON });

    dialog('/auth/' + network).then(
      authentication => {
        authentication.provider = network;
        dispatch(signOn(authentication));
      }
    , error => {
        dispatch({ type: SIGN_ON_FAILED, payload: { statusText: '', status: 400 }});
      });
  };  
}

export function signOnToTwitter() {
  return signOnToNetwork('twitter');
};

export function signOnToGoogle() {
  return signOnToNetwork('google');
};

export function verify(code) {
  return {
    [RESOURCE]: {
      types: [ VERIFY, VERIFY_SUCCESS, VERIFY_FAILED ]
    , payload: {
        url: '/sessions'
      , method: 'post'
      , data: { authentication: { provider: 'verify', verificationCode: code }}
      }
    }
  };  
};

export function update(user) {
  return { type: UPDATE, payload: { user }};
};