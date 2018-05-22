import React from 'react';
import { USER_LOGIN_ROUTE, USER_TEST_NOTIFICATIONS_ROUTE, USER_LIST_ROUTE } from './ApiRoutes'
import {restRequest, restAuthRequest} from './RestRequest'
const METHOD_POST = 'POST'
const METHOD_GET = 'GET'


export const logUser = ((firebaseUser, callback) => {
    restRequest({method: METHOD_POST, route: USER_LOGIN_ROUTE, body: {user: firebaseUser}}, ({success, user}) => {
        callback(user)
    })
});

export const logUserUsingToken = ((token, callback) => {
    restRequest({method: METHOD_POST, route: USER_LOGIN_ROUTE, body: {token}}, ({success, user}) => {
        callback(user)
    })
});

export const testNotifications = ((callback) => {
    restAuthRequest({method: METHOD_GET, route: USER_TEST_NOTIFICATIONS_ROUTE}, () => {
        callback()
    })
});

export const getUserList = ((callback) => {
    restAuthRequest({method: METHOD_GET, route: USER_LIST_ROUTE}, ({success, user_list}) => {
        if (success){
            callback(user_list)
            return   
        }
        callback([])
    })
});
