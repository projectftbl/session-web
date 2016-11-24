import { take, put } from 'redux-saga/effects';

import { AUTHENTICATE_SUCCESS } from '../ducks/authenticate';

import { signOn } from '../ducks/session';

export function* authenticate() {
  while(true) {
    const authentication = yield take(AUTHENTICATE_SUCCESS);
    yield put(signOn({ provider: 'oauth', accessToken: authentication.payload.access_token }));
  }
};
