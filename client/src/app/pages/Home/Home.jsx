import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as actions from './actions'
import {getHome} from './selectors'

import Sidebar from '../../components/molecules/SideBar'

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
            <div className="Home">
                <Sidebar />
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
