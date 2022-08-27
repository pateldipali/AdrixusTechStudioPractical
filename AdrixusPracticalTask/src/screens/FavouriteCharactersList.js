import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import CardView from '../components/CardView';
import { useSelector } from "react-redux";

const FavouriteCharactersList = ({ navigation, route }) => {

    const [favouriteList, setFavouriteList] = useState([])
    const favList = useSelector((state) => state.favouriteList);
    console.log('using useselctor----', favList)
    // useEffect(() => {
    //     if (favList) {
    //         setFavouriteList(favList.favouriteLis)
    //     }
    // }, [favList])
    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Favourites</Text>
                <View style={styles.rowstyle}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Icon name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderItems = ({ item, index }) => {
        console.log('item,index---', item, index)
        return (
            <View style={styles.cardContainerStyle}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.img }} style={styles.iamgeView} />
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.nameStyle}>{item.name}</Text>
                        <Icon name="favorite" size={25} color="#2AC878" />
                    </View>
                    <Text style={styles.nicknameStyle}>{item.nickname}</Text>
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderHeader()}
                {favList.favouriteList ?
                    <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        style={styles.flatlistContainerStyle}
                        contentContainerStyle={{ paddingBottom: '5%' }}
                        data={favList.favouriteList}
                        // renderItem={renderItems}
                        renderItem={renderItems}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    : null
                }
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    flatlistContainerStyle: {
        marginTop: 10, marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20
    },
    headerText: {
        fontSize: 30, alignSelf: 'center', marginVertical: 10, color: '#2AC878', fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    rowstyle: {
        flexDirection: 'row', alignItems: 'center'
    },
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

export default FavouriteCharactersList