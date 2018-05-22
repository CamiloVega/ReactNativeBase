import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import Card from '../general_purpose/Card'
export default UserListItem = (props) => {
    const { picture, display_name, email } = props.user
    const { name_style, email_style, main_container_style, picture_style } = styles
    return (
        <Card >
            <View style={main_container_style}>
                <Image resizeMode="cover" style={picture_style} source={{ uri: picture }} />
                <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                    <Text style={name_style}>{display_name}</Text>
                    <Text style={email_style}> {email}</Text>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    main_container_style: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 2,
        alignItems: 'center'
    },
    picture_style: {
        height: 60,
        width: 60,
        borderRadius: 30,
        margin: 10
    },
    name_style: {
        fontSize: 30,
        textAlign: 'left',
        color: '#515151',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    email_style: {
        fontSize: 20,
        color: '#919191',
        textAlign: 'left',
        backgroundColor: 'rgba(0,0,0,0)'
    }
})