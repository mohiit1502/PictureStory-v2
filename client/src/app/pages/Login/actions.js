export const LOGIN_DATA_STATE_RECEIVED = 'LOGIN_DATA_STATE_RECEIVED'
export const UPDATE_FORM_VALUES = 'UPDATE_BILLING_FORM_VALUES'
export const UPDATE_FORM_ERRORS = 'UPDATE_BILLING_FORM_ERRORS'

export const updateLoginDataState = (payload) => ({type: LOGIN_DATA_STATE_RECEIVED, payload})

export const initializeLogin = () => (dispatch) => {
    // return Promise.all([
    //     dispatch(initializeApp())
    // ])
    // .then(() => ({statusCode: 200}))
    // .catch((err) => ({statusCode: err.statusCode || 500}))
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
    