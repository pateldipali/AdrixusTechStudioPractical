import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput, Touchable } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CardView = ({ data, index, selectedFilter, setSelectedFilter, }) => {
    var { item } = data

    function selectFilter(item) {
        console.log('asfkdjhgakfc---', item)
        // console.log('dropdown data-------', selectedFilter.includes(item._id))
        if (selectedFilter.includes(item)) {
            let removed = selectedFilter.filter((item1, index) => item.char_id != item1.char_id)
            setSelectedFilter(removed)
        }
        else {
            let select = [...selectedFilter]
            select.push(item)
            setSelectedFilter(select)
        }
        console.log('selected filter ----', selectedFilter)
    }

    return (
        <View style={styles.cardContainerStyle}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.img }} style={styles.iamgeView} />
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.nameStyle}>{item.name}</Text>
                    <TouchableOpacity onPress={() => selectFilter(item)}>
                        {selectedFilter.includes(item) ?
                            <Icon name="favorite" size={30} color="#2AC878" />
                            :
                            <Icon name="favorite-border" size={30} color="#333333" />
                        }
                    </TouchableOpacity>
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