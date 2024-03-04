import { all } from 'redux-saga/effects'
import { dashboardSaga } from '../pages/Dashboard/store/saga'

export function* rootSaga() {
  yield all([dashboardSaga()])
}
