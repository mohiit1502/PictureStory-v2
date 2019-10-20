import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom';
import PageLoader from './components/molecules/PageLoader'
import Loadable from 'react-loadable'

export const LoadableHome = Loadable({
    loader: () => import('./pages/Home'),
    loading: PageLoader
})

export const LoadableLogin = Loadable({
    loader: () => import('./pages/Login'),
    loading: PageLoader
})

class Router extends React.Component {

    render() {
        const {store} = this.props
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route exact path="/" component={LoadableLogin} />
                    <Route path="/home" component={LoadableHome} />
                    <Route path="/login" component={LoadableLogin} />
                </BrowserRouter>
            </Provider>
        )
    }
}

Router.propTypes = {
    store: PropTypes.object
}

export default Router
