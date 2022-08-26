import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const CardView = ({ data, index }) => {
    var { item } = data
    console.log('asfkdjhgakfc---', data)
    return (
        <View style={styles.cardContainerStyle}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.img }} style={styles.iamgeView} />
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.nameStyle}>{item.name}</Text>
                    <Icon name="favorite-border" size={25} color="#333333" />
                </View>
                <Text style={styles.nicknameStyle}>{item.nickname}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainerStyle: {
        width: '42%', backgroundColor: 'black', marginTop: 40, borderColor: 'black', borderWidth: 1, borderRadius: 12, marginHorizontal: 15, overflow: 'hidden'
    },
    imageContainer: {
        borderRadius: 12, overflow: 'hidden', width: '100%', height: 200,
    },
    iamgeView: {
        width: '100%', height: '100%', resizeMode: 'cover'
    },
    textContainer: {
        width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    nameStyle: {
        width: '80%', color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    nicknameStyle: {
        color: 'white', fontSize: 16, fontFamily: 'Roboto-Light'
    }
})
export default CardView;