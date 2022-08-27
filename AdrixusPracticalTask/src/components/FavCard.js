import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput, } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { ColorConstant } from './ColorConstant';

const FavCard = ({ data, index, favourite }) => {
    var { item } = data

    return (
        <View style={styles.cardContainerStyle}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.img }} style={styles.iamgeView} />
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.nameStyle}>{item.name}</Text>
                    {favourite ?
                        <Icon name="favorite" size={25} color={ColorConstant.GREEN} />
                        : <Icon name="favorite-border" size={30} color={ColorConstant.GREY} />
                    }
                </View>
                <Text style={styles.nicknameStyle}>{item.nickname}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    cardContainerStyle: {
        width: '42%', backgroundColor: ColorConstant.BLACK, marginTop: 40, borderColor: 'black', borderWidth: 1, borderRadius: 12, marginHorizontal: 15, overflow: 'hidden'
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
        width: '80%', color: ColorConstant.WHITE, fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    nicknameStyle: {
        color: ColorConstant.WHITE, fontSize: 16, fontFamily: 'Roboto-Light'
    }
})
export default FavCard;