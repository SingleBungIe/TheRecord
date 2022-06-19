import { applyMiddleware, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import userSaga from '../saga/userSaga'
import rootReducer from '../reducers/index'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = composeWithDevTools || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
)

function* rootSaga() {
  yield all([userSaga()])
}
sagaMiddleware.run(rootSaga)

export default store
