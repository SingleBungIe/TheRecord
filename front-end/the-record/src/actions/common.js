import { createSetValueAction } from '../common/redux-helper'

export const types = {
  SET_VALUE: 'common/SET_VALUE',
  FETCH_USER_INFO: 'common/FETCH_USER_INFO',
}

export const actions = {
  setValue: createSetValueAction(types.SET_VALUE),
}
