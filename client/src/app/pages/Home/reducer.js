import Immutable from 'immutable'

import {
    HOME_DATA_STATE_RECEIVED,
    SAVE_RETRIEVED_IMAGES,
    UPDATE_FORM_ERRORS,
    UPDATE_FORM_VALUES,
    UPDATE_BACKGROUND,
    UPDATE_MODAL_STATE,
    UPDATE_UPLOAD_MODAL_STATE,
    TOGGLE_CHAT_VIEW
} from './actions'

const initialState = Immutable.Map({
    formErrors: [],
    formValues: []
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_DATA_STATE_RECEIVED:
        case SAVE_RETRIEVED_IMAGES:
        case UPDATE_FORM_ERRORS:
        case UPDATE_FORM_VALUES:
        case UPDATE_BACKGROUND:
        case UPDATE_MODAL_STATE:
        case UPDATE_UPLOAD_MODAL_STATE:
        case TOGGLE_CHAT_VIEW:
            return state.mergeDeep(action.payload)
        default:
            return state
    }
}

export default reducer
