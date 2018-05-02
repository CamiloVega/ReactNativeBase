import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { testUserNotifications} from '../../api/UserService'
import Button from '../general_purpose/Button'
const ProfileCard = (props) => {

    // const testUserNotificationsPressed = () => {
    //     console.log("testUserNotifications")
    //     console.log("token", global.authToken)
    //     testUserNotifications()
    // }

    const { picture, first_name, last_name, email } = props.user
    const {
        card,
        text_view_heading_1,
        picture_style,
        main_container_style,
        blur_picture,
        picture_container,
        info_container
        } = styles
    let name = first_name + ' ' + last_name
    return (
        <View style={card}>
            <ImageBackground source={{ uri: picture }} style={blur_picture} blurRadius={10}>
                <View style={picture_container}>
                    <Image resizeMode="cover" style={picture_style} source={{uri: picture}} />
                    <Text style={[styles.text_view_heading_1, { marginTop: 15 }]}>
                        {name}
                    </Text>
                </View>
            </ImageBackground>
            <View style={info_container}>

            <TextField
                    style={{ flex: 1, marginLeft: 20 }}
                    label='First Name'
                    baseColor='#FFFFFF'
                    textColor='#FFFFFF'
                    fontSize={25}
                    value={first_name}
                    disabled = {true}
                />
                 <TextField
                    style={{ flex: 1, marginLeft: 20 }}
                    label='Last Name'
                    baseColor='#FFFFFF'
                    textColor='#FFFFFF'
                    fontSize={25}
                    value={last_name}
                    disabled = {true}
                />
                <TextField
                    style={{ flex: 1, marginLeft: 20 }}
                    label='Email'
                    baseColor='#FFFFFF'
                    textColor='#FFFFFF'
                    fontSize={25}
                    value={email}
                    disabled = {true}
                />
                <Button onPress = {testUserNotifications}>
                 Test Notifications
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main_container_style: {
        height: 400,
    },
    info_container: {
        flex: 1,
        backgroundColor: 'rgba(10,49,52,1)',
        padding: 10
    },
    picture_container: {
        flex: 1,
        // flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    blur_picture: {
        flex: 1,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture_style: {
        height: 150,
        width: 150,
        borderRadius: 75
    },

    card: {
        flex: 1,
        borderRadius: 15,
    },
    noMoreCardsText: {
        fontSize: 22,
    },
    text_view_heading_1: {
        fontSize: 30,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)'
        // fontFamily: APPLICATION_FONT
    }
})

export default ProfileCard
