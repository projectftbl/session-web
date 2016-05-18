import qs from 'querystring';
import { take, put, call } from 'redux-saga/effects';
import { reset } from 'redux-form';
import { push } from 'react-router-redux';
import { info } from 'frieze';
import cookie from 'react-cookie';

import { 
  SIGN_ON_SUCCESS
, RELOAD_SUCCESS
, SIGN_OUT_SUCCESS
, VERIFY_SUCCESS
, VERIFY_FAILED } from '../ducks/session';

const TOKEN = 'token'
    , options = { path: '/' };

function* saveToken(token) {
  if (token == null) return;
  cookie.save(TOKEN, token, options);
};

function* clearToken() {
  cookie.remove(TOKEN, options);
};

function getRedirect(defaultRedirect) {
  const { redirect } = qs.parse(window.location.search.substring(1));

  return redirect || defaultRedirect;
};

export function* signOn() {
  while(true) {
    const session = yield take(SIGN_ON_SUCCESS);
    yield call(saveToken, session.payload.session.token);
    yield put(push(getRedirect('/member/connect')));
    yield put(reset('signOn'));
  }
};

export function* reload() {
  while(true) {
    const { payload, meta: { redirect }} = yield take(RELOAD_SUCCESS);
    yield call(saveToken, payload.session.token);
    if (redirect) yield put(push(getRedirect('/member/connect')));
  }
};

export function* signOut() {
  while(true) {
    const { meta: { redirect }} = yield take(SIGN_OUT_SUCCESS);
    yield call(clearToken);
    yield put(info('You have been signed out.'));
    if (redirect) yield put(push('/signon'));
  }
};

export function* verify() {
  while(true) {
    const session = yield take(VERIFY_SUCCESS);
    yield call(saveToken, session.payload.session.token);
    yield put(push('/member'));
    yield put(info('Your email has been successfully verified.'));
  }
};

export function* invalid() {
  while(true) {
    yield take(VERIFY_FAILED);
    yield put(push('/signon'));
  }
};
