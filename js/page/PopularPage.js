import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation';
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

class PopularTab extends Component<Props> {
    constructor(props) {
        super(props);
        const {tabLabel} = this.props;
        this.storeName = tabLabel;
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName, url);
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        return <PopularItem item={item} onSelect={() => {}}/>
    }

    render() {
        const {popular} = this.props;
        let store = popular[this.storeName]; //动态获取state
        if(!store) {
            store = {
                items: [],
                isLoading: false
            }
        }
        return (
            <View style={styles.container}>
                <FlatList
                    data = {store.items}
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
                    }/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    popular: state.popular
});

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
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
    }
});
