import {createSelector} from 'reselect'
import {createGetSelector} from 'reselect-immutable-helpers'

const getData = ({data}) => data

export const getHome = createSelector(
    getData,
    (dataState) => {
        return dataState.pages.home
    }
)

export const getBackgroundImage = createGetSelector(getHome, 'backgroundImage')
export const getModalState = createGetSelector(getHome, 'modalOpened')
export const getUploadModalState = createGetSelector(getHome, 'uploadModalOpened')
export const getFormValues = createGetSelector(getHome, 'formValues')
export const getFormErrors = createGetSelector(getHome, 'formErrors')
export const getImages = createGetSelector(getHome, 'images')
export const getChatViewStatus = createGetSelector(getHome, 'chatView')
