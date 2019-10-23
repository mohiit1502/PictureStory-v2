import React from 'react'
import PropTypes from 'prop-types'

import InputField from '../../../atoms/InputField'
import SelectOption from '../../../atoms/SelectOption'

/**
 * INSERT_DESCRIPTION_HERE
 */

class FormFieldContainer extends React.Component {
    constructor(props) {
        super(props)
        const componentKey = this.props.propsData && this.props.propsData.id
        const passedValue = this.props.value || (this.props.propsData && this.props.propsData.value)
        this.state = {
            error: false,
            errorMessage: null
        }
        this.props.updateFormValues({
            formValues: {
                // ...this.props.formValues,
                [componentKey]: passedValue ? passedValue : ''
            }
        })
        this.props.updateFormErrors({
            formErrors: {
                // ...this.props.formErrors,
                [componentKey]: ''
            }
        })
        this.customExecutes = this.customExecutes.bind(this)
        this.prepareCVN = this.prepareCVN.bind(this)
        this.executeDateValidations = this.executeDateValidations.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onBlurHandler = this.onBlurHandler.bind(this)
        this.onFocusHandler = this.onFocusHandler.bind(this)
    }

    /**
     * validateFormField - validates the input field values
     * @param  {object} event js event object
     * @param  {object} validationObj fieldinput data as props
     */
    validateFormField(e, validationObj) {
        const {propsData, formErrors, formValues, updateFormErrors, updateFormValues} = this.props
        const inputValue = e.target.value && e.target.value
        let error = false
        let errorMessage = ''
        const componentKey = propsData.id
        const validRegex =
            validationObj.dataRuleRegex &&
            new RegExp(validationObj.dataRuleRegex.regex).test(inputValue)
        const poValidRegex =
            e.target.id === 'address1' &&
            validationObj.dataRuleRegex.po_regex &&
            new RegExp(validationObj.dataRuleRegex.po_regex, 'i').test(inputValue)

        if (e.target.tagName && e.target.tagName === 'SELECT') {
            if (
                validationObj.required.isRequired &&
                e.target.selectedIndex === 0 &&
                !validationObj.required.preSelected
            ) {
                error = true
                errorMessage = validationObj.required.error_message
            }
        } else if (e.target.tagName && e.target.tagName === 'INPUT') {
            if (validationObj.required.isRequired) {
                if (inputValue.trim('') === '') {
                    error = true
                    errorMessage = validationObj.required.error_message
                } else if (validationObj.dataRuleRegex && !validRegex) {
                    error = true
                    errorMessage = validationObj.dataRuleRegex.error_message
                } else if (validationObj.dataRuleRegex && poValidRegex) {
                    error = true
                    errorMessage = validationObj.dataRuleRegex.po_error_message
                }
            }
        } else {
            error = false
            errorMessage = null
        }

        if (!errorMessage && propsData.id === 'expiration_month') {
            errorMessage = this.executeDateValidations()
            if (errorMessage) {
                error = true
            }
        }

        this.setState({
            error
        })

        updateFormErrors({
            formErrors: {
                ...formErrors,
                [componentKey]: errorMessage
            }
        })

        updateFormValues({
            formValues: {
                ...formValues,
                [componentKey]: inputValue
            }
        })

        return error
    }

    onChangeHandler(event) {
        const value = event.target.value
        this.setState({
            value
        })
        this.executeDateValidations(event)
    }

    onFocusHandler(event) {
        this.setState({
            oldValue: event.target.value
        })
    }

    onBlurHandler(validation, customBlurHandler, e) {
        e.oldValue = this.state.oldValue
        const {customBlurFormatter} = this.props
        const isError = this.validateFormField(e, validation)
        if (!isError) {
            if (customBlurHandler && typeof customBlurHandler === 'function') {
                customBlurHandler(e)
            }
            if (customBlurFormatter && typeof customBlurFormatter === 'function') {
                this.setState({value: customBlurFormatter(e)})
            }
        }
    }

    prepareCVN() {
        const {propsData, selectedCreditCard} = this.props
        if (propsData && propsData.ccNumberUpdated !== undefined && propsData.ccNumberUpdated) {
            this.setState({
                value: ''
            })
            this.props.updateFormValues({
                formValues: {
                    ...this.props.formValues,
                    security_code: ''
                }
            })
            propsData.ccNumberUpdated = false
        }
        if (selectedCreditCard) {
            if (selectedCreditCard.payment_card.card_type === 'Amex') {
                propsData.validation.dataRuleRegex.regex = /^[0-9'\s]{4}$/
                propsData.validation.rules.maxlength = 4
            } else {
                propsData.validation.dataRuleRegex.regex = /^[0-9'\s]{3}$/
                propsData.validation.rules.maxlength = 3
            }
        }
    }

    executeDateValidations(event) {
        const {propsData, formValues, formErrors, updateFormErrors} = this.props
        let errorMessage = ''
        if (propsData.id === 'expiration_month' || propsData.id === 'expiration_year') {
            let month = ''
            let year = ''
            if (propsData.id === 'expiration_month') {
                month = +event.target.value
                year = +formValues.expiration_year
            } else if (propsData.id === 'expiration_year') {
                month = +formValues.expiration_month
                year = +event.target.value
            }
            const currentYear = new Date().getFullYear()
            const currentMonth = new Date().getMonth()
            if (year === currentYear && month < currentMonth + 1) {
                errorMessage = 'This Credit Card is expired'
            } else {
                errorMessage = ''
            }
            updateFormErrors({
                formErrors: {
                    ...formErrors,
                    expiration_month: errorMessage
                }
            })
        }
        return errorMessage
    }

    customExecutes() {
        this.prepareCVN()
    }

    render() {
        const {customBlurHandler, formErrors, propsData} = this.props
        const {elementType} = propsData
        const errorMessage = formErrors && formErrors[propsData.id]
        this.customExecutes()
        const meta = {
            ...this.props.propsData,
            className: this.state.error ? 'error' : '',
            error: this.state.error || errorMessage,
            errorMessage,
            handlers: {
                onBlurHandler: this.onBlurHandler,
                customBlurHandler,
                onChangeHandler: this.onChangeHandler,
                onFocusHandler: this.onFocusHandler
            },
            fieldValues: {
                propsValue: this.props.value,
                stateValue: this.state.value
            }
        }

        /**
         * switch function - returns HTML Tag depending upon the requirement
         * @param  {string} elementType - element type e.g. input,select
         */
        switch (elementType) {
            case 'input':
                return <InputField meta={meta} />
            case 'select':
                return <SelectOption meta={meta} />
            default:
                return <input />
        }
    }
}

FormFieldContainer.propTypes = {
    propsData: PropTypes.object.isRequired,
    className: PropTypes.string,
    customBlurHandler: PropTypes.func,
    customBlurFormatter: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
    formValues: PropTypes.object,
    formErrors: PropTypes.object,
    selectedCreditCard: PropTypes.object,
    updateFormValues: PropTypes.func,
    updateFormErrors: PropTypes.func
}

export default FormFieldContainer
