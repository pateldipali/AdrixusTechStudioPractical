import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, ImageBackground, ScrollView } from "react-native"
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import moment from 'moment'
import NavigationService from '../navigation/NavigationService';
import FavCard from '../components/FavCard';
import { ColorConstant } from '../components/ColorConstant';

const CharacterDetail = ({ route }) => {

    const { charData } = route.params

    const renderHeader = () => {
        return (
            <ImageBackground source={{ uri: charData.img }} style={{ height: hp(65) }}>
                <View style={{ height: hp(65), backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'space-between' }}>
                    <View style={styles.headerContainer}>
                        {/* <View style={styles.rowstyle}> */}
                        <TouchableOpacity onPress={() => NavigationService.pop()}>
                            <Icon name="arrow-back" size={30} color={ColorConstant.WHITE} />
                        </TouchableOpacity>
                        <Icon name="favorite" size={30} color={ColorConstant.GREEN} />
                        {/* </View> */}
                    </View>
                    <View style={{ alignItems: 'center', paddingBottom: hp(2) }}>
                        <Image source={{ uri: charData.img }} style={{ width: 170, height: 220, borderRadius: 7, }} />
                        <Text style={styles.nameStyle}>{charData.name}</Text>
                        <Text style={styles.nicknameStyle}>{charData.nickname}</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    const RenderItems = ({ item, index }) => {
        console.log('item,index---', item, index)
        return (
            <View style={styles.cardContainerStyle}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.img }} style={styles.iamgeView} />
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 10 }}>
                    <View style={styles.textContainer}>
                        <Text numberOfLines={1} style={styles.nameStyle}>{item.name}</Text>
                    </View>
                    <Text style={styles.nicknameStyle}>{item.nickname}</Text>
                </View>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {renderHeader()}
            <View style={{ paddingHorizontal: hp(2), paddingVertical: hp(2) }}>
                <View style={styles.portrayedCardStyle}>
                    <View>
                        <Text style={styles.titleStyle}>Portrayed</Text>
                        <Text style={styles.textStyle}>{charData.portrayed}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: hp(1) }}>
                        <Text style={styles.dateStyle}>{moment(charData.birthday).format('DD-MMMM-YYYY')}</Text>
                        <Feather name="gift" size={18} color={ColorConstant.WHITE} />
                    </View>
                </View>
                <View style={{ paddingVertical: hp(3) }}>
                    <Text style={styles.titleStyle}>Occupation</Text>
                    <View style={{ marginTop: hp(1) }}>
                        {charData?.occupation.map((item, index) => {
                            return (
                                <Text style={styles.textStyle}>{item}</Text>
                            )
                        })
                        }
                    </View>
                </View>
                <View style={{ paddingVertical: hp(3) }}>
                    <Text style={styles.titleStyle}>Appeared In</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: hp(2), flexDirection: 'row' }}>
                        {charData?.appearance.map((item, index) => {
                            return (
                                <View style={styles.seasonCardStyle}>
                                    <Text style={styles.textStyle}>{`Season ${item}`}</Text>
                                </View>
                            )
                        })
                        }
                    </ScrollView>
                </View>
                {/* <View style={{ marginTop: hp(6) }}>
                    <Text style={{ color: 'white', fontSize: 35, fontFamily: 'Roboto-Bold', }}>Other characters</Text>
                    <FlatList
                        // horizontal
                        keyboardShouldPersistTaps={'handled'}
                        showsVerticalScrollIndicator={false}
                        // numColumns={2}
                        style={styles.flatlistContainerStyle}
                        contentContainerStyle={{ paddingBottom: '5%' }}
                        data={characterList}
                        // renderItem={renderItems}
                        renderItem={(item, index) => <FavCard
                            data={item}
                            favourite
                        />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View> */}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorConstant.BLACK,
        // paddingTop: hp(4),
    },
    headerContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: hp(2),
        paddingTop: hp(4)
    },
    headerText: {
        fontSize: 27, alignSelf: 'center', marginVertical: 10, color: ColorConstant.WHITE, fontWeight: 'bold', fontFamily: 'Roboto-Bold'
    },
    rowstyle: {
        flexDirection: 'row', alignItems: 'center'
    },
    titleStyle: {
        color: ColorConstant.GREEN, fontSize: 18, fontFamily: 'Roboto-Bold'
    },
    textStyle: {
        color: ColorConstant.WHITE, fontSize: 17, fontFamily: 'Roboto-Light',
    },
    nameStyle: {
        fontSize: 40, color: ColorConstant.WHITE, fontWeight: 'bold', fontFamily: 'Roboto-Bold', marginTop: hp(4)
    },
    nicknameStyle: {
        fontSize: 20, color: ColorConstant.WHITE, fontFamily: 'Roboto-Light'
    },
    portrayedCardStyle: {
        flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingVertical: hp(2)
    },
    dateStyle: {
        color: ColorConstant.WHITE, fontSize: 18, fontFamily: 'Roboto-Light', paddingRight: hp(1)
    },
    seasonCardStyle: {
        paddingHorizontal: hp(1.5), paddingVertical: hp(0.5), backgroundColor: ColorConstant.GREY, marginRight: hp(1), borderRadius: 3
    },
    flatlistContainerStyle: {
        marginTop: 10, marginBottom: 20,
    },
    // cardContainerStyle: {
    //     backgroundColor: 'black', marginTop: 40, borderColor: 'black', borderWidth: 1, borderRadius: 12, marginHorizontal: 15, overflow: 'hidden'
    // },
    // imageContainer: {
    //     borderRadius: 12, overflow: 'hidden', width: 200, height: 200,
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

export default CharacterDetail