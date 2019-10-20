import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './Form.module.css'
import FormFieldContainer from '../FormFieldContainer';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.onFocusHandler = this.onFocusHandler.bind(this)
    }

    onFocusHandler() {
        console.log('Parent, on focus handler')
    }

    render() {
        const {
            context,
            customBlurHandler,
            customBlurFormatter,
            fieldValues,
            formErrors,
            formValues,
            metaData,
            updateFormErrors,
            updateFormValues
        } = this.props
        // const jsonData = this.props && this.props.metaData
        const inputList = metaData && context ? Object.keys(metaData[context]) : []

        let inputListSection =
            inputList &&
            inputList.map((item, index) => {
                const formFieldObject = metaData[context][item]
                const formField = formFieldObject ? (
                    <FormFieldContainer
                        propsData={formFieldObject}
                        key={index}
                        onFocus={this.onFocusHandler}
                        customBlurHandler={
                            formFieldObject.impactsShippingOptions ||
                            formFieldObject.id === 'number'
                                ? customBlurHandler
                                : null
                        }
                        customBlurFormatter={
                            formFieldObject.formatNeeded ? customBlurFormatter : null
                        }
                        value={fieldValues && fieldValues[item]}
                        formErrors={formErrors}
                        formValues={formValues}
                        updateFormErrors={updateFormErrors}
                        updateFormValues={updateFormValues}
                    />
                ) : null
                return formField
            })

        inputListSection = inputListSection.filter((formFieldObject) => {
            return formFieldObject !== null
        })

        return <fieldset className={styles['c-Form']}>{inputListSection}</fieldset>
    }
}

Form.propTypes = {
    context: PropTypes.string,
    customBlurHandler: PropTypes.func,
    customBlurFormatter: PropTypes.func,
    metaData: PropTypes.object.isRequired,
    className: PropTypes.string,
    fieldValues: PropTypes.object,
    formErrors: PropTypes.object,
    formValues: PropTypes.object,
    updateFormErrors: PropTypes.func,
    updateFormValues: PropTypes.func
}

export default Form