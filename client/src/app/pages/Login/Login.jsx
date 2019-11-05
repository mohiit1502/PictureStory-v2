import React from 'react'
import PropTypes from 'prop-types'
import styles from './Login.module.scss'
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as actions from './actions'
import {getLogin, getFormErrors, getFormValues} from './selectors'
import LoginForm from '../../components/molecules/LoginForm'
import SocialLogin from '../../components/molecules/SocialLogin'
import Jumbotron from '../../components/molecules/common/Jumbotron'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.pageType = 'login'
    }

    componentDidMount() {
        const {initializeLogin} = this.props
        initializeLogin()
    }

    clicked() {
        console.log('login handler')
    }

    render() {
      const {updateFormErrors, updateFormValues, formErrors, formValues} = this.props
      return (
          <div className={`${styles.Login} container`} onClick={this.clicked}>
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <Jumbotron
                            jumboText="Welcome To Ecstatica"
                            subText="Show us what you've got!"
                            jumboDescription="An app for professional photographers, to provide a window to the world and to demonstrate the art within."
                            furtherLink="Learn more"
                        />
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className={styles.loginContainer}>
                        <p className={styles['c-login-intimation']}>Let's get to know each other, shall we!</p>
                            <LoginForm
                                updateFormValues={updateFormValues}
                                updateFormErrors={updateFormErrors}
                                formErrors={formErrors}
                                formValues={formValues}
                            />
                            <p className={styles.loginSplitter}>OR</p>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
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
