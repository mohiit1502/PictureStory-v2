import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {createPropsSelector} from 'reselect-immutable-helpers'

import * as actions from './actions'
import {getBackgroundImage} from './selectors'

import Sidebar from '../../components/molecules/SideBar'
import CommandPrompt from '../../components/molecules/common/CommandPrompt'
import PrincipalContent from '../../components/molecules/PrincipalContent/PrincipalContent';
import Uploader from '../../components/molecules/common/Uploader/Uploader';

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
                <div className="c-background" style={{backgroundImage: `url(${this.props.backgroundImage})`}} />
                <Sidebar />
                <CommandPrompt />
                <PrincipalContent />
                <Uploader />
            </div>
        )
    }
}

Home.propTypes = {
    backgroundImage: PropTypes.string,
    initializeHome: PropTypes.func
}

const mapStateToProps = createPropsSelector({
    backgroundImage: getBackgroundImage
})

const mapDispatchToProps = {
    initializeHome: actions.initializeHome
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
