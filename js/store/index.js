import {applyMiddleware, createStore} from 'redux';
import reducers from '../reducer';
import {middleware} from '../navigator/AppNavigator';
import thunk from 'redux-thunk';

const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching', action);
    }
    const result = next(action);
    console.log('nextState', store.getState());
};

const middlewares = [
    middleware,
    logger,
    thunk
];

/**
 *  创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));