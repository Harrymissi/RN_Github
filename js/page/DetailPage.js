import React, {Component} from 'react';
import {WebView, StyleSheet, Text, View, TouchableOpacity, DeviceInfo} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../utils/ViewUtil';
import NavigationUtil from "../navigator/NavigationUtil";
import BackPressComponent from "../common/BackPressComponent";

const TRENDING_URL = 'https://github.com/';
const THEME_COLOR = '#678';

type Props = {};
export default class DetailPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params; //取出导航器里的参数
        const {projectModel} = this.params;
        this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
        this.title = projectModel.full_name || projectModel.fullName;
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()});
        this.state = {
            title: this.title,
            url: this.url,
            canGoBack: false  //是否还能返回上一级
        }
    }
    componentDidMount() {
        this.backPress.componentDidMount();
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount();
    }
    onBackPress() {
        this.onBack();
        return true;
    }

    onBack() {
        if (this.state.canGoBack) {
            this.webview.goBack(); // WebView 提供的函数，返回上一页
        } else {
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => this.onFavoriteButtonClick()}>
                    <FontAwesome
                        name={'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {ViewUtil.getShareButton(() => {})}
            </View>
        )
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            url: navState.url,
        })
    }

    render() {
        const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar
            leftButton={ViewUtil.getLeftBackButton(() => this.onBack())}
            titleLayoutStyle={titleLayoutStyle}
            title={this.state.title}
            style={{backgroundColor: THEME_COLOR}}
            rightButton={this.renderRightButton()}
        />;
        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView
                    ref={webview => this.webview = webview}
                    startInLoadingState={true}
                    onNavigationStateChange={e => this.onNavigationStateChange(e)}
                    source={{uri: this.state.url}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:  DeviceInfo.isIPhoneX_deprecated ? 30 : 0
    },
});
