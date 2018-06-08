import React from 'react'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';
import LoginView from '../components/login/LoginView'
import ProfileView from '../components/profile/ProfileView'
import PassThroughView from '../components/passthrough/PassThroughView'
import UserListView from '../components/user_list/UserListView'
import SuggestionListView from '../components/suggestions/SuggestionListView'
import SuggestionView from '../components/suggestions/SuggestionView'

import {
    TouchableOpacity, Image, StyleSheet, ScrollView, Text, View, ImageBackground
} from 'react-native';

const AppMainColor = '#898989'

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
            <View style={picture_container}>
                <Image source={{ uri: picture }} style={drawer_image} />
                <Text style={user_name_label}>{display_name}</Text>
            </View>
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
                backgroundColor: AppMainColor,
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
                backgroundColor: AppMainColor,
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

const SuggestionListNavigator = StackNavigator({
    SuggestionList: {
        screen: SuggestionListView,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <DrawerButton navigation={navigation} />,
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: AppMainColor,
            },
            headerTitleStyle:
            {
                color: 'white',
            },
        }),
    },
    SuggestionView: {
        screen: SuggestionView,
        navigationOptions: ({ navigation }) => ({

        }),
        
    },
},
    {
    });

const MainDrawerNavigator = DrawerNavigator({
    Profile: {
        screen: ProfileNavigator,
        navigationOptions: {
            title: 'Profile',
        }
    },
    UserList: {
        screen: UserListNavigator,
        navigationOptions: {
            title: 'User List',
        }
    },
    SuggestionList: {
        screen: SuggestionListNavigator,
        navigationOptions: {
            title: 'Suggestion List',
        }
    },
},
    {
        initialRouteName: 'Profile',
        contentComponent: CustomDrawerContentComponent,
        headerMode: 'none',
        contentOptions: {
            activeTintColor: '#000000',
            inactiveTintColor: '#000000',
            activeBackgroundColor: '#F0F0F0',
            inactiveBackgroundColor: '#FFFFFF',
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
        backgroundColor: '#898989'
    },
    user_name_label: {
        fontSize: 30,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0)'
    },
    drawer_items_container: {
        flex: 5,
        alignSelf: "stretch",
        backgroundColor: '#FFFFFF'
    },
    blur_picture: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});