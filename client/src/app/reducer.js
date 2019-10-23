import {combineReducers} from 'redux'

import loginReducer from './pages/Login/reducer'
import homeReducer from './pages/Home/reducer'

export default combineReducers({
    data: combineReducers({
        pages: combineReducers({
            home: homeReducer,
            login: loginReducer
        })
    })
})
