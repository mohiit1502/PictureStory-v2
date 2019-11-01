import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as actions from './actions'
import {getBackgroundImage, getHome} from './selectors'

import Sidebar from '../../components/molecules/SideBar'
import CommandPrompt from '../../components/molecules/common/CommandPrompt'
import PrincipalContent from '../../components/molecules/PrincipalContent/PrincipalContent';

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
            <div className="Home" style={{backgroundImage: `url(${this.props.backgroundImage})`}}>
                <Sidebar />
                <CommandPrompt />
                <PrincipalContent />
            </div>
        )
    }
}

Home.propTypes = {
    backgroundImage: PropTypes.string,
    initializeHome: PropTypes.func,
    dataState: PropTypes.object
}

const mapStateToProps = createPropsSelector({
    backgroundImage: getBackgroundImage,
    dataState: getHome
})

const mapDispatchToProps = {
    initializeHome: actions.initializeHome
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
