import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator} from 'react-navigation';
import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';
import FetchDemoPage from '../page/FetchDemoPage';
import AsyncStorageDemoPage from '../page/AsyncStorageDemoPage';
import DataStoreDemoPage from '../page/DataStoreDemoPage';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';

export const rootCom = 'Init'; //设置根路由

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null  // 可以将header设为null， 来禁用StackNavigation Bar
        }
    }
});

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null  // 可以将header设为null， 来禁用StackNavigation Bar
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            //header: null  // 可以将header设为null， 来禁用StackNavigation Bar
        }
    },
    FetchDemoPage: {
        screen: FetchDemoPage,
        navigationOptions: {
            //header: null  // 可以将header设为null， 来禁用StackNavigation Bar
        }
    },
    AsyncLocalStorageDemoPage: {
        screen: AsyncStorageDemoPage,
        navigationOptions: {
            //header: null  // 可以将header设为null， 来禁用StackNavigation Bar
        }
    },
    DataStoreDemoPage: {
        screen: DataStoreDemoPage,
        navigationOptions: {
            //header: null  // 可以将header设为null， 来禁用StackNavigation Bar
        }
    }
});

export const RootNavigator =  createSwitchNavigator({   // 连接这两个导航器
    Init: InitNavigator,
    Main: MainNavigator,
}, {
    navigationOptions: {
        header: null  // 可以将header设为null， 来禁用StackNavigation Bar
    }
});

/**
 *  1. 初始化react-navigation与redux的中间件
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

/**
 *  2. 将导航器组件传递给reduxifyNavigator函数,
 *  并返回一个将navigation state和dispatch函数作为props的新组件
 *  注意： 要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 *  State到Props的映射关系
 * @param state
 * @returns {{state: *}}
 */
const mapStateToProps = state => ({
    state: state.nav, //v2
});

/**
 * 3. 连接 React组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);