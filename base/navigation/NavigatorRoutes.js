import React from 'react'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import LoginView from '../components/login/LoginView'
import ProfileView from '../components/profile/ProfileView'
import PassThroughView from '../components/passthrough/PassThroughView'
import UserListView from '../components/user_list/UserListView'
import {
    TouchableOpacity, Image, StyleSheet, ScrollView, Text, View, ImageBackground
} from 'react-native';

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity
        onPress={() => navigation.toggleDrawer()} >
        <Image source={require('../image_resources/drawer_icon.png')} style={stylesNav.image} />
    </TouchableOpacity>
);

const CustomDrawerContentComponent = (props) => {
    const { picture, display_name } = props.navigation.state.params.user
    const { container, user_name_label, drawer_image, picture_container, blur_picture, drawer_items_container } = stylesNav
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={{ uri: picture }} style={blur_picture} blurRadius={10}>
                <View style={picture_container}>
                    <Image source={{ uri: picture }} style={drawer_image} />
                    <Text style={user_name_label}>{display_name}</Text>
                </View>
            </ImageBackground>
            <View style={drawer_items_container}>
                <ScrollView style={{ flex: 1 }}>
                    <DrawerItems {...props} />
                </ScrollView>
            </View>
        </View>

    )
};


const ProfileNavigator = StackNavigator({
    Profile: {
        screen: ProfileView,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'rgba(10,49,52,1)',
            },
            headerTitleStyle:
                {
                    color: 'white',
                },
        }),
    },
},
{
    headerMode: 'screen'
});

const UserListNavigator = StackNavigator({
    UserList: {
        screen: UserListView,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'rgba(10,49,52,1)',
            },
            headerTitleStyle:
                {
                    color: 'white',
                },
        }),
    },
},
{
    headerMode: 'screen'
});

const MainDrawerNavigator = DrawerNavigator({
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            title: 'Profile',
            drawerIcon: ({ }) => (
                <Image
                    source={require('../image_resources/drawer_profile.png')}
                    style={{ tintColor: '#FFFFFF', height: 24, width: 24 }}
                />)
        }
    },
    UserList: {
        screen: UserListNavigator,
        navigationOptions: {
            title: 'User List',
            drawerIcon: ({ }) => (
                <Image
                    source={require('../image_resources/drawer_userlist.png')}
                    style={{ tintColor: '#FFFFFF', height: 24, width: 24 }}
                />)
        }
    },
},
    {
        initialRouteName: 'Profile',
        contentComponent: CustomDrawerContentComponent,
        headerMode: 'none',
        contentOptions: {
            activeTintColor: 'rgba(10,49,52,1)',
            inactiveTintColor: '#FFFFFF',
            activeBackgroundColor: '#EFB6AD',
            inactiveBackgroundColor: 'rgba(10,49,52,1)',
        }
    }
);


export const RootNavigator = StackNavigator({
    PassThrough: {
        screen: PassThroughView,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: LoginView,
        navigationOptions: { header: null }
    },
    Main: {
        screen: MainDrawerNavigator,

    }

}, {
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    });

const stylesNav = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        margin: 10,
        height: 25,
        width: 25,
    },
    drawer_image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        margin: 10
    },
    picture_container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "stretch",
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    user_name_label: {
        fontSize: 30,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    drawer_items_container: {
        flex: 5,
        alignSelf: "stretch",
        backgroundColor: 'rgba(10,49,52,1)'
    },
    blur_picture: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});