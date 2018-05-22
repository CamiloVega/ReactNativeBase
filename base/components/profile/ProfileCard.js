import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { testUserNotifications } from '../../api/UserService'
import Button from '../general_purpose/Button'
import Card from '../general_purpose/Card'
const ProfileCard = (props) => {
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
        <Card >
            
                <ImageBackground source={{ uri: picture }} style={blur_picture} blurRadius={10}>
                    <View style={picture_container}>
                        <Image resizeMode="cover" style={picture_style} source={{ uri: picture }} />
                        <Text style={[text_view_heading_1, { marginTop: 15 }]}>
                            {name}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={info_container}>

                    <TextField
                        style={{ flex: 1, marginLeft: 20 }}
                        label='First Name'
                        baseColor='#0C0C0C'
                        tintColor='#000000'
                        fontSize={23}
                        value={first_name}
                        disabled={true}
                    />
                    <TextField
                        style={{ flex: 1, marginLeft: 20 }}
                        label='Last Name'
                        baseColor='#0C0C0C'
                        tintColor='#000000'
                        fontSize={23}
                        value={last_name}
                        disabled={true}
                    />
                    <TextField
                        style={{ flex: 1, marginLeft: 20 }}
                        label='Email'
                        baseColor='#0C0C0C'
                        tintColor='#0C0C0C'
                        fontSize={23}
                        value={email}
                        disabled={true}
                    />
                    <Button onPress={testUserNotifications}>
                        Test Notifications
                </Button>
                </View>
            
        </Card>
    );
}

const styles = StyleSheet.create({
    main_container_style: {
        height: 400,
    },
    info_container: {
        backgroundColor: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    picture_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    blur_picture: {
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    picture_style: {
        height: 120,
        width: 120,
        borderRadius: 60
    },

    card: {
        flex: 1,
        borderRadius: 15,
    },
    noMoreCardsText: {
        fontSize: 22,
    },
    text_view_heading_1: {
        fontSize: 25,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)'
    }
})

export default ProfileCard
