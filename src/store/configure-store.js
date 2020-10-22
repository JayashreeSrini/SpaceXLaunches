import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducer/root-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const composeEnhancers = process.env.NODE_ENV !== 'production' ? composeWithDevTools : compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
const configureStore = () => {
    const store = createStore(rootReducer, enhancer)
    return store;
};
export default configureStore