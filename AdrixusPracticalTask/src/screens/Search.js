import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity } from "react-native"
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CardView from '../components/CardView';

const Search = ({ navigation, route }) => {
    const [searchList, setSearchList] = useState([])
    const [focus, setFocus] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState([])

    useEffect(() => {
        seacrh('')
    }, [])

    async function seacrh(text) {
        console.log('text---', text)
        try {
            const response = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${text}`);
            console.log('search list------', response);
            setSearchList(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                {focus ?
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    : null}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => seacrh(text)}
                    // value={number}
                    placeholder="Search"
                    placeholderTextColor={'#fff'}
                    keyboardType="default"
                    onFocus={() => setFocus(true)}
                />
                <View style={styles.rowstyle}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Icon name="close" size={30} color="#fff" />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    return (
        // <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            {renderHeader()}
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                {searchList.length == 0 ?
                    <View style={{ paddingHorizontal: hp(2), paddingVertical: hp(5) }}>
                        <Text style={styles.nodataStyle}>No character found</Text>
                        <Text style={styles.tryAgainStyle}>Try again</Text>
                    </View>
                    :
                    <FlatList
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        style={styles.flatlistContainerStyle}
                        contentContainerStyle={{ paddingBottom: '5%' }}
                        data={searchList}
                        // renderItem={renderItems}
                        renderItem={(item, index) => <CardView data={item}
                            selectedFilter={selectedCategory}
                            setSelectedFilter={(value) => setSelectedCategory(value)} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
            </View>

        </View>
        // </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242424',
        paddingTop: hp(4),
    },
    flatlistContainerStyle: {
        // flex: 1 / 2,
        marginTop: 10, marginBottom: 20,
    },
    headerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginBottom: hp(1)
    },
    headerText: {
        fontSize: 27, alignSelf: 'center', marginVertical: 10, color: 'white', fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    rowstyle: {
        flexDirection: 'row', alignItems: 'center'
    },
    input: {
        width: '85%',
        height: 60,
        fontSize: 40,
        fontFamily: 'Roboto-Thin',
        color: '#fff',
        padding: 10,
    },
    nodataStyle: {
        fontSize: 30,
        fontFamily: 'Roboto-Light',
        color: '#2AC878'
    },
    tryAgainStyle: {
        fontSize: 30,
        fontFamily: 'Roboto-Light',
        color: '#fff'
    }
})

export default Search