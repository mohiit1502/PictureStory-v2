import Immutable from 'immutable'

import {HOME_DATA_STATE_RECEIVED, UPDATE_FORM_ERRORS, UPDATE_FORM_VALUES, UPDATE_BACKGROUND, UPDATE_MODAL_STATE} from './actions'

const initialState = Immutable.Map({
    formErrors: [],
    formValues: []
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_DATA_STATE_RECEIVED:
        case UPDATE_FORM_ERRORS:
        case UPDATE_FORM_VALUES:
        case UPDATE_BACKGROUND:
        case UPDATE_MODAL_STATE:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default reducer
