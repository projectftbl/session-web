import { take, put } from 'redux-saga/effects';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { info } from 'frieze';

import { RESET_SUCCESS, RESEND_SUCCESS, clear } from '../ducks/forgotten';

export function* resetPassword() {
  while(true) {
    yield take(RESET_SUCCESS);
    yield reset('forgotten');
    yield put(clear());
    yield put(info('Your password has been reset. Please check your inbox.'));
    yield put(push('/signon'));
  }
};

export function* resend() {
  while(true) {
    yield take(RESEND_SUCCESS);
    yield put(info('Your verification email has been sent again. Please check your inbox.'));
  }
};
