import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, DeviceInfo} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLVIEW from 'react-native-htmlview';
import NavigationUtil from "../navigator/NavigationUtil";
import BaseItem from "./BaseItem";
import {FLAG_STORAGE} from "../expand/dao/DataStore";

export default class TrendingItem extends BaseItem{
    onItemClick(item) {
        NavigationUtil.goPage({
            projectModel: item,
            flag: FLAG_STORAGE.flag_trending
        }, 'DetailPage')
    }
    render() {
        const {projectModel} = this.props;
        const {item} = projectModel;
        if (!item) return null;
        let description = '<p>' + item.description + '</p>';
        return (
            <TouchableOpacity
                onPress={()=>this.onItemClick(item)}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>
                        {item.fullName}
                    </Text>
                    <HTMLVIEW
                        value={description}
                        onLinkPress={(url) => {
                        }}
                        stylesheet={{
                            p: styles.description,
                            a: styles.description
                        }}
                    />
                    <Text style={styles.description}>
                        {item.meta}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Contributors:</Text>
                            {item.contributors.map((result, i, arr) => {
                                return <Image
                                    key={i}
                                    style={{height: 22, width: 22, margin: 2}}
                                    source={{uri: arr[i]}}
                                />
                            })}
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text>Start:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
        cell_container: {
            backgroundColor: 'white',
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            marginVertical: 3,
            borderColor: '#dddddd',
            borderWidth: 0.5,
            borderRadius: 2,
            shadowColor: 'gray',
            shadowOffset: {width: 0.5, height: 0.5},
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 2
        },
        row: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            fontSize: 16,
            marginBottom: 2,
            color: '#212121',
        },
        description: {
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
        }
    }
);