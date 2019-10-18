import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';

import PageLoader from './components/page-loader'
import Loadable from 'react-loadable'

// Containers
import App from './index'

// Use Webpacks' import() with react-loadable to do code-splitting on a
// per-component basis. We recommend doing this for pages in your app.

export const Home = Loadable({
    loader: () => import('./pages/home' /* webpackChunkName: "home" */),
    loading: PageLoader
})

export const Login = Loadable({
    loader: () => import('./pages/cart' /* webpackChunkName: "cart" */),
    loading: PageLoader
})

class Router extends React.Component {

    render() {
        const {store} = this.props

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path="/" component={App}>
                        <Route path="home" component={Home} />
                        <Route path="login" component={Login} />
                    </Route>
                </BrowserRouter>
            </Provider>
        )
    }
}

Router.propTypes = {
    store: PropTypes.object
}

export default Router
