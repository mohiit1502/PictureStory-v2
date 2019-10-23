import React from 'react';
import PropTypes from 'prop-types';

import loginFormFields from './../../../config/forms-meta/login-form.json'
import Form from './../common/Form'

const LoginForm = props => {
  return (
    <div className='c-LoginForm'>
      <Form 
        metaData={loginFormFields} 
        context="login"
        updateFormValues={props.updateFormValues}
        updateFormErrors={props.updateFormErrors}
        formErrors={props.formErrors}
        formValues={props.formValues}
      />
    </div>
  );
};

LoginForm.propTypes = {
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func,
  formValues: PropTypes.object,
  formErrors: PropTypes.object
};

export default LoginForm;