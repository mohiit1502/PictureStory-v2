import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Login extends React.Component {

    render() {
        const {
            className,
            text
        } = this.props

        const classes = classNames('c-login', {
            // 'c--modifier': bool ? true : false
        }, className)

        return (
            <div className={classes}>
                I am an example! {text}
            </div>
        )
    }
}


Login.propTypes = {
    /**
     * PropTypes comments are REQUIRED for components to be included
     * in the styleguide
     */
    text: PropTypes.string.isRequired,

    /**
     * Adds values to the  attribute of the root element
     */
    className: PropTypes.string,

}

export default Login
