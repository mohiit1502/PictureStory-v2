import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as actions from './actions'
import {getHome} from './selectors'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.pageType = 'home'
    }

    componentDidMount() {
        const {initializeHome} = this.props
        initializeHome()
    }

    render() {
        return (
            <div className={styles.Home}>
                <h1 className="u-padding-top-md u-margin-bottom-sm">Home page</h1>
                <p className="u-margin-bottom-md">Tips for getting started on this page:</p>
            </div>
        )
    }
}

Home.propTypes = {
    initializeHome: PropTypes.func,
    dataState: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    dataState: getHome
})

const mapDispatchToProps = {
    initializeHome: actions.initializeHome
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
