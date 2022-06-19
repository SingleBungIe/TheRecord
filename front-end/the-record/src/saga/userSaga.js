/* eslint-disable no-unused-vars */
/* eslint-disable require-yield */
import { all, put, call, takeEvery } from 'redux-saga/effects'
import { actions, types } from '../actions/common'
import callApi from '../common/api'

function* fetchUerInfo({ userInfo, key }) {
  const data = yield call(callApi, {
    url: `/api/user/${userInfo.userPk}/info`,
  })
  if (data) {
    yield put(actions.setValue(key, data))
  }
}

export default function* userSaga() {
  yield all([takeEvery(types.FETCH_USER_INFO, fetchUerInfo)])
}
