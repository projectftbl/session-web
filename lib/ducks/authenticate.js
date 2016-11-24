import assign from 'lodash/object/assign';
import { RESOURCE } from '@recipher/resource';

export const AUTHENTICATE = 'recipher/session/authenticate/AUTHENTICATE';
export const AUTHENTICATE_SUCCESS = 'recipher/session/authenticate/AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILED = 'recipher/session/authenticate/AUTHENTICATE_FAILED';

const initialState = { 
  isAuthenticating: false
, accessToken: null
};

const ERRORS = {
  503: 'Error during authenticating'
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case AUTHENTICATE:
    return assign({}, state, { isAuthenticating: true, accessToken: null });

  case AUTHENTICATE_SUCCESS:
    return assign({}, state, { isAuthenticating: false, accessToken: action.payload.accessToken });

  case AUTHENTICATE_FAILED:
    return assign({}, state, { error: ERRORS[action.payload.status], isAuthenticating: false, accessToken: null })

  default:
    return state;
  }
};

export function authenticate(credentials) {
  return {
    [RESOURCE]: {
      types: [ AUTHENTICATE, AUTHENTICATE_SUCCESS, AUTHENTICATE_FAILED ]
    , payload: {
        url: '/oauth/token', method: 'post', { data: { username: credentials.email, password: credentials.password }}
      }
    }
  };
};
