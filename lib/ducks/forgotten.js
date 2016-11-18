import assign from 'lodash/object/assign';
import { RESOURCE } from '@recipher/resource';

export const RESET = 'recipher/session/forgotten/RESET';
export const RESET_SUCCESS = 'recipher/session/forgotten/RESET_SUCCESS';
export const RESET_FAILED = 'recipher/session/forgotten/RESET_FAILED';

export const RESEND = 'recipher/session/forgotten/RESEND';
export const RESEND_SUCCESS = 'recipher/session/forgotten/RESEND_SUCCESS';
export const RESEND_FAILED = 'recipher/session/forgotten/RESEND_FAILED';

export const CLEAR = 'recipher/session/forgotten/CLEAR';

const initialState = { 
  resetting: false
, reset: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case RESET:
  case RESEND:
    return assign({}, state, { resetting: true, reset: false });
  case RESET_SUCCESS:
  case RESET_FAILED:
  case RESEND_SUCCESS:
  case RESEND_FAILED:
    return assign({}, state, { resetting: false, reset: true });
  case CLEAR:
    return initialState;

  default:
    return state;
  }
};

export function resetPassword(data) {
  return {
    [RESOURCE]: {
      types: [ RESET, RESET_SUCCESS, RESET_FAILED ]
    , payload: {
        url: '/users/passwords'
      , method: 'post'
      , data: { email: data.email }
      }
    }
  };
};

export function resend(email) {
  return {
    [RESOURCE]: {
      types: [ RESEND, RESEND_SUCCESS, RESEND_FAILED ]
    , payload: {
        url: '/users/passwords'
      , method: 'post'
      , data: { email, resetPassword: false }
      }
    }
  };
};

export function clear() {
  return { type: CLEAR };
};