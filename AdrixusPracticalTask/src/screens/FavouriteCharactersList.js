import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import CardView from '../components/CardView';
import { useSelector } from "react-redux";
import FavCard from '../components/FavCard';
import { ColorConstant } from '../components/ColorConstant';

const FavouriteCharactersList = ({ navigation, route }) => {

    const [favouriteList, setFavouriteList] = useState([])
    const favList = useSelector((state) => state.favouriteList);

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Favourites</Text>
                <View style={styles.rowstyle}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Icon name="close" size={30} color={ColorConstant.WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

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
                        renderItem={(item, index) => <FavCard
                            data={item}
                            favourite
                        />}
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
        backgroundColor: ColorConstant.BLACK
    },
    flatlistContainerStyle: {
        marginTop: 10, marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20
    },
    headerText: {
        fontSize: 30, alignSelf: 'center', marginVertical: 10, color: ColorConstant.GREEN, fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    rowstyle: {
        flexDirection: 'row', alignItems: 'center'
    },

})

export default FavouriteCharactersList