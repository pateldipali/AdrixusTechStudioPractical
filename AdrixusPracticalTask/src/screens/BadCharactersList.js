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
import NavigationService from '../navigation/NavigationService';
import { ColorConstant } from '../components/ColorConstant';

const BadCharactersList = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [characterList, setCharacterList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        getCharaters()
    }, [])

    async function getCharaters() {
        try {
            const response = await axios.get('https://www.breakingbadapi.com/api/characters');
            setCharacterList(response.data)
        } catch (error) {
            console.error(error);
        }
    }


    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>The Breaking Bad</Text>
                <View style={styles.rowstyle}>
                    <TouchableOpacity onPress={() => NavigationService.navigate('Search')}>
                        <Feather name="search" size={30} color={ColorConstant.WHITE} style={{ marginRight: 20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => NavigationService.navigate('FavouriteCharactersList')}>
                        <Icon name="favorite" size={30} color={ColorConstant.GREEN} />
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
        backgroundColor: ColorConstant.BLACK
    },
    flatlistContainerStyle: {
        marginTop: 10, marginBottom: 20, alignSelf: 'center'
    },
    headerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20
    },
    headerText: {
        fontSize: 27, alignSelf: 'center', marginVertical: 10, color: ColorConstant.WHITE, fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    rowstyle: {
        flexDirection: 'row', alignItems: 'center'
    },

})

export default BadCharactersList