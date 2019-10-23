import Immutable from 'immutable'

import {LOGIN_DATA_STATE_RECEIVED, UPDATE_FORM_ERRORS, UPDATE_FORM_VALUES} from './actions'

const initialState = Immutable.Map()

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA_STATE_RECEIVED:
        case UPDATE_FORM_ERRORS:
        case UPDATE_FORM_VALUES:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default reducer
