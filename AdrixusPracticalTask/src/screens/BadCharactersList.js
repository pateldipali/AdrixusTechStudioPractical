import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TextInput } from "react-native"
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const BadCharactersList = ({ navigation, route }) => {
    // const { userArray } = route.params
    const [userList, setUserList] = useState([])
    const [query, setQuery] = useState('');
    const [searchList, setSearchList] = useState([]);

    // console.log('userArray-----', userArray)

    useEffect(() => {
        getCharaters()
    }, [])

    async function getCharaters() {
        try {
            const response = await axios.get('https://www.breakingbadapi.com/api/characters');
            console.log('user list------', response.data);
            setUserList(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    const renderItems = ({ item, index }) => {
        return (
            <View style={{ width: '42%', backgroundColor: 'black', marginTop: 40, borderColor: 'black', borderWidth: 1, borderRadius: 12, marginHorizontal: 15, overflow: 'hidden' }}>
                <View style={{ borderRadius: 12, overflow: 'hidden', width: '100%', height: 200, }}>
                    <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text numberOfLines={1} style={{ color: 'white', fontSize: 20, fontWeight: 'bold', }}>{item.name}</Text>
                        {/* <Icon name="rocket" size={30} color="#900" /> */}
                    </View>
                    <Text style={{ color: 'white', fontSize: 16 }}>{item.nickname}</Text>
                </View>
            </View>
        );
    };



    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 27, alignSelf: 'center', marginVertical: 10, color: 'white', fontWeight: 'bold' }}>The Breaking Bad</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="search" size={30} color="#900" />
                        <Icon name="rocket" size={30} color="#900" />
                    </View>
                </View>

                <FlatList
                    keyboardShouldPersistTaps={'handled'}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    style={{ marginTop: 10, marginBottom: 20, alignSelf: 'center' }}
                    contentContainerStyle={{ paddingBottom: '5%' }}
                    data={query ? searchList : userList}
                    renderItem={renderItems}
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
    textInput: {
        height: 50,
        width: '90%',
        fontStyle: 'italic',
        color: '#777',
        fontSize: 20,
        alignSelf: 'center',
        paddingLeft: 10,
        borderColor: '#c8c8c8', borderWidth: 1, borderRadius: 12,
    },
})

export default BadCharactersList