import produce from 'immer'

export function createReducer(initialState, handlerMap) {
  // eslint-disable-next-line default-param-last
  return (state = initialState, action) =>
    produce(state, draft => {
      const handler = handlerMap[action.type]
      if (handler) {
        handler(draft, action)
      }
    })
}

export function createSetValueAction(type) {
  return (key, value) => ({ type, key, value })
}

export function setValueReducer(state, action) {
  // eslint-disable-next-line no-param-reassign
  state[action.key] = action.value
}
