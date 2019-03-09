import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation';
import Toast from 'react-native-easy-toast';
import actions from '../action/index';
import PopularItem from '../common/PopularItem';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';


type Props = {};
export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }

    _genTabs() {
        const tabs = [];
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>, // 传参
                navigationOptions: {
                    title: item
                }
            }
        });
        return tabs;
    }

    render() {
        const TabNavigator = createMaterialTopTabNavigator(  // 顶部导航
            this._genTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false, // 是否标签大写，默认为true
                    scrollEnabled: true,  //是否支持选项卡滚动，默认为false
                    style: {
                        backgroundColor: '#678' //TabBar背景色
                    },
                    indicatorStyle: styles.indicatorStyle, //标签指示器样式
                    labelStyle: styles.labelStyle // 文字的样式
                }
            }
        );
        return <View style={{flex: 1, marginTop: 30}}>
            <TabNavigator/>
        </View>;
    }
}

const pageSize = 10;
class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData(loadMore) {
        const {onRefreshPopular, onLoadMorePopular} = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        if(loadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            });
        } else {
            onRefreshPopular(this.storeName, url, pageSize);
        }
    }

    /**
     * 获取与当前页面有关的数据
     * @returns {*}
     * @private
     */
    _store() {
        const {popular} = this.props;
        let store = popular[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [], // 要显示的数据
                hideLoadingMore: true //默认隐藏加载更多
            }
        }
        return store;
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem item={item} onSelect={() => {}}/>
    }

    genIndicator() {
        return this._store().hideLoadingMore? null:
            <View style={styles.indicatorContainer}>
                <ActivityIndicator style={styles.indicator}/>
                <Text>正在加载更多</Text>
            </View>
    }
    render() {
        let store = this._store();
        return (
            <View style={styles.container}>
                <FlatList
                    data = {store.projectModels}
                    renderItem = {data => this.renderItem(data)}
                    keyExtractor = {item => ""+item.id}
                    refreshControl = {
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={()=>this.loadData()}
                            tintColor={THEME_COLOR}/>
                    }
                    ListFooterComponent={()=>this.genIndicator()}
                    onEndReached={() => {
                        console.log('---onEndReached----');
                        setTimeout(() => {
                            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                        console.log('---onMomentumScrollBegin-----')
                    }}
                />
                <Toast ref={'toast'} position={'center'}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch => ({
    onRefreshPopular: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback))
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    },
    indicatorContainer: {
        alignItems: 'center'
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});
