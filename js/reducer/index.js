import {combineReducers} from 'redux';
import {rootCom, RootNavigator} from '../navigator/AppNavigator';
import theme from './theme';
import popular from './popular';

//1.指定默认的state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom));

/**
 *  2.创建自己的 navigation reducer
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    // 如果’nextState‘ 为null或未定义，只需返回原始 ’state‘
    return nextState || state
};

/**
 * 3. 合并reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
    nav: navReducer,
    theme: theme,
    popular: popular
});

export default index;
