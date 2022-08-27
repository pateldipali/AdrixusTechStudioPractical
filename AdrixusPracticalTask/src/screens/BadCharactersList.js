import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput } from "react-native"
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { TouchableOpacity } from 'react-native-gesture-handler';
import CardView from '../components/CardView';
import { useDispatch, useSelector } from 'react-redux'
import { addFavourites } from '../actions/Favourite.Action';

const BadCharactersList = ({ navigation, route }) => {
    // const { userArray } = route.params
    const dispatch = useDispatch()
    const [characterList, setCharacterList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        getCharaters()
    }, [])

    async function getCharaters() {
        try {
            const response = await axios.get('https://www.breakingbadapi.com/api/characters');
            console.log('user list------', response.data);
            setCharacterList(response.data)
        } catch (error) {
            console.error(error);
        }
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
                        <Icon name="favorite-border" size={25} color="#333333" />
                    </View>
                    <Text style={styles.nicknameStyle}>{item.nickname}</Text>
                </View>
            </View>
        );
    };

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>The Breaking Bad</Text>
                <View style={styles.rowstyle}>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Feather name="search" size={30} color="#fff" style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.push('FavouriteCharactersList')}>
                        <Icon name="favorite" size={30} color="#2AC878" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    useEffect(() => {
        dispatch(addFavourites(selectedCategory))
    }, [selectedCategory])

    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderHeader()}
                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={styles.flatlistContainerStyle}
                    contentContainerStyle={{ paddingBottom: '5%' }}
                    data={characterList}
                    // renderItem={renderItems}
                    renderItem={(item, index) => <CardView
                        data={item}
                        selectedFilter={selectedCategory}
                        setSelectedFilter={(value) => setSelectedCategory(value)} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
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
        marginTop: 10, marginBottom: 20, alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20
    },
    headerText: {
        fontSize: 27, alignSelf: 'center', marginVertical: 10, color: 'white', fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    rowstyle: {
        flexDirection: 'row', alignItems: 'center'
    },
    // cardContainerStyle: {
    //     width: '42%', backgroundColor: 'black', marginTop: 40, borderColor: 'black', borderWidth: 1, borderRadius: 12, marginHorizontal: 15, overflow: 'hidden'
    // },
    // imageContainer: {
    //     borderRadius: 12, overflow: 'hidden', width: '100%', height: 200,
    // },
    // iamgeView: {
    //     width: '100%', height: '100%', resizeMode: 'cover'
    // },
    // textContainer: {
    //     width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    // },
    // nameStyle: {
    //     width: '80%', color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    // },
    // nicknameStyle: {
    //     color: 'white', fontSize: 16, fontFamily: 'Roboto-Light'
    // }
})

export default BadCharactersList