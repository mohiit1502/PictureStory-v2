import Immutable from 'immutable'

import {
    HOME_DATA_STATE_RECEIVED,
    SAVE_RETRIEVED_IMAGES,
    UPDATE_FORM_ERRORS,
    UPDATE_FORM_VALUES,
    UPDATE_BACKGROUND,
    UPDATE_MODAL_STATE,
    UPDATE_UPLOAD_MODAL_STATE,
    TOGGLE_CHAT_VIEW,
    UPDATE_CHAT_MESSAGES
} from './actions'

const initialState = Immutable.Map({
    formErrors: [],
    formValues: [],
    chatMessages: []
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
        case UPDATE_CHAT_MESSAGES:
            console.log(...state.get('chatMessages'))
            const chatMessages = [...state.get('chatMessages'), action.payload]
            console.log(chatMessages)
            return state.setIn('chatMessages', chatMessages)
        default:
            return state
    }
}

export default reducer
