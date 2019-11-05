import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({meta}) => {
  return (
    <div className='c-InputField'>
      <div
            className={`form-group row ${
                meta.container_class ? meta.container_class : ''
            }`}
            aria-required={meta.aria_required}
        >
            <label htmlFor={meta.id} className="col-12 col-sm-3 col-lg-12 col-form-label">
                {meta.validation.required.isRequired && !meta.isStandAloneField && (
                    <span className="required-indicator">* </span>
                )}
                {meta.label}
            </label>
            {meta.secondaryLabel ? (
                <span className="field--label-description">{meta.secondaryLabel}</span>
            ) : null}
            <div className="col-12 col-sm-9 col-12">
                {meta.error && (
                    <span className="form-wrapper__field-error">{meta.errorMessage}</span>
                )}
                <input
                    className={`form-control ${meta.error ? 'error' : ''}`}
                    type={meta.type}
                    id={meta.id}
                    name={meta.name}
                    data-firstname="null"
                    value={
                        meta.fieldValues && meta.fieldValues.stateValue !== undefined
                            ? meta.fieldValues.stateValue
                            : meta.fieldValues.propsValue
                    }
                    required={meta.validation.required.isRequired ? 'required' : ''}
                    minLength={meta.validation.rules.minlength}
                    maxLength={meta.validation.rules.maxlength}
                    placeholder={meta.placeholder}
                    aria-required={meta.aria_required}
                    aria-invalid={meta.aria_invalid}
                    // onFocus={onBlurProp ? onBlurProp : this.onFocusHandler}
                    onBlur={(e) =>
                        meta.handlers.onBlurHandler(
                            meta.validation,
                            meta.handlers.customBlurHandler,
                            e
                        )
                    }
                    onFocus={meta.handlers.onFocusHandler}
                    onChange={meta.handlers.onChangeHandler}
                    style={{width: '100%'}}
                />
            </div>
        </div>
    </div>
  );
};

InputField.defaultProps = {

};

InputField.propTypes = {
  meta: PropTypes.object
};

export default InputField;