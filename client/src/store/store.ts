import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers/index';
import thunk from 'redux-thunk';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
    }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export default store;