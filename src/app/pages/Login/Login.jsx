import React from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as actions from './actions'
import {getLogin, getFormErrors, getFormValues} from './selectors'
import LoginForm from '../../components/molecules/LoginForm'
import SocialLogin from '../../components/molecules/SocialLogin'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.pageType = 'login'
    }

    componentDidMount() {
        const {initializeLogin} = this.props
        initializeLogin()
    }

    render() {
      console.log("in login")
      const {updateFormErrors, updateFormValues, formErrors, formValues} = this.props
      return (
          <div className={styles.Login}>
              <h1 className="u-padding-top-md u-margin-bottom-sm">Welcome to Ecstatica</h1>
              <p className="u-margin-bottom-md">Please login to continue</p>
              <LoginForm
                updateFormValues={updateFormValues}
                updateFormErrors={updateFormErrors}
                formErrors={formErrors}
                formValues={formValues}
            />
            <p className={styles.loginSplitter}>OR</p>
              <SocialLogin />
          </div>
      )
    }
}

Login.propTypes = {
    initializeLogin: PropTypes.func,
    dataState: PropTypes.object,
    updateFormValues: PropTypes.func,
    updateFormErrors: PropTypes.func,
    formValues: PropTypes.object,
    formErrors: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    dataState: getLogin,
    formErrors: getFormErrors,
    formValues: getFormValues
})

const mapDispatchToProps = {
    initializeLogin: actions.initializeLogin,
    updateFormErrors: actions.updateFormErrors,
    updateFormValues: actions.updateFormValues
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)
