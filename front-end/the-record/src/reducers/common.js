import { types } from '../actions/common'
import { createReducer, setValueReducer } from '../common/redux-helper'

const COMMON_STATE = {
  navPage: 'nav-home',
}

const common = createReducer(COMMON_STATE, {
  [types.SET_VALUE]: setValueReducer,
})

export default common
