import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import launches from './launch-reducer'

const rootReducer = combineReducers({
    form: reduxFormReducer,
    launches
})

export default rootReducer