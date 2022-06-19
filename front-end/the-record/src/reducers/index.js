import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'

import common from './common'

const persistConfig = {
  key: 'commonInfo',
  storage,
  whitelist: ['common'],
}

const rootReducer = combineReducers({
  common,
})

export default persistReducer(persistConfig, rootReducer)
