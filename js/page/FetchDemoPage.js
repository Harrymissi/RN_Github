import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View, TextInput} from 'react-native';
import actions from "../action";
import {connect} from "react-redux";

type Props = {};
export default class FetchDemoPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.state={
            showText: ''
        }
    }
    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(res => res.text())
            .then(resText => {
                this.setState({
                    showText: resText
                })
            })
    }
    loadData2() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(res => {
                if (res.ok) {
                    return res.text();
                }
                throw new Error('Network response is not OK')
            })
            .then(resText => {
                this.setState({
                    showText: resText
                })
            })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch Demo</Text>
                <View style={styles.input_container}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text=>{
                            this.searchKey = text;
                        }}
                    />
                    <Button
                        title="获取"
                        onPress={() => {
                            this.loadData();
                        }}/>
                </View>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
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
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

