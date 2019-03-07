import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

type Props = {};
const KEY = 'save_key';
export default class AsyncStorageDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state={
            showText: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>AsyncStorage Demo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <View style={styles.input_container}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>存储</Text>
                    <Text onPress={() => {
                        this.doRemove();
                    }}>删除</Text>
                    <Text onPress={() => {
                        this.getData();
                    }}>获取</Text>
                </View>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
    async doSave() {
        // 用法一
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        });

        // //用法二
        // AsyncStorage.setItem(KEY, this.value)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     });
        //
        // // 用法三
        // try {
        //     await AsyncStorage.setItem(KEY, this.value);
        // } catch (e) {
        //     e && console.log(e.toString());
        // };
    }

    async getData() {
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value
            });
            console.log(value);
            error && console.log(error.toString());
        });
    };

    async doRemove() {
        AsyncStorage.removeItem(KEY, error => {
            error && console.log(error.toString());
        });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

