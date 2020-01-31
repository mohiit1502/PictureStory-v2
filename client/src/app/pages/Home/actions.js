import DataService from './../../services/data.service.ts'

export const HOME_DATA_STATE_RECEIVED = 'HOME_DATA_STATE_RECEIVED'
export const SAVE_RETRIEVED_IMAGES = 'SAVE_RETRIEVED_IMAGES'
export const UPDATE_FORM_VALUES = 'UPDATE_BILLING_FORM_VALUES'
export const UPDATE_FORM_ERRORS = 'UPDATE_BILLING_FORM_ERRORS'
export const UPDATE_BACKGROUND = 'UPDATE_BACKGROUND'
export const UPDATE_MODAL_STATE = 'UPDATE_MODAL_STATE'
export const UPDATE_UPLOAD_MODAL_STATE = 'UPDATE_UPLOAD_MODAL_STATE'
export const TOGGLE_CHAT_VIEW = 'TOGGLE_CHAT_VIEW'
export const UPDATE_CHAT_MESSAGES = 'UPDATE_CHAT_MESSAGES'

export const updateHomeDataState = (payload) => ({type: HOME_DATA_STATE_RECEIVED, payload})
const ds = new DataService()
export const initializeHome = () => (dispatch) => {
    // return Promise.all([
    //     dispatch(initializeApp())
    // ])
    // .then(() => ({statusCode: 200}))
    // .catch((err) => ({statusCode: err.statusCode || 500}))
    ds.getFeaturedImages().then(res => {
        // console.log(res)
        dispatch(saveRetrievedImages(res))
    }).catch(err => console.log(err))
}

export const saveRetrievedImages = (images) => {
    return {
        type: SAVE_RETRIEVED_IMAGES,
        payload: {images}
    }
}
export const updateFormValues = (formValues) => {
    return {
        type: UPDATE_FORM_VALUES,
        payload: formValues
    }
}

export const updateFormErrors = (formErrors) => {
    return {
        type: UPDATE_FORM_ERRORS,
        payload: formErrors
    }
}

export const updateBackground = (backgroundImage) => {
    return {
        type: UPDATE_BACKGROUND,
        payload: {backgroundImage, modalOpened: true}
    }
}

export const updateModalState = (modalState) => {
    return {
        type: UPDATE_MODAL_STATE,
        payload: {modalOpened: modalState}
    }
}

export const updateUploadModalState = (uploadModalState) => {
    return {
        type: UPDATE_UPLOAD_MODAL_STATE,
        payload: {uploadModalOpened: uploadModalState}
    }
}

export const toggleChatView = (chatView) => {
    return {
        type: TOGGLE_CHAT_VIEW,
        payload: {chatView}
    }
}

export const updateChatMessages = (message) => {
    return {
        type: UPDATE_CHAT_MESSAGES,
        payload: message
    }
}

    