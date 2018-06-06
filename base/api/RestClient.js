import React from 'react';
import { USER_LOGIN_ROUTE, USER_TEST_NOTIFICATIONS_ROUTE, USER_LIST_ROUTE } from './ApiRoutes'
import { restRequest, restAuthRequest } from './RestRequest'
const METHOD_POST = 'POST'
const METHOD_GET = 'GET'


export const logUser = ((firebaseUser, callback, onError = (error) => console.log(error)) => {
    restRequest({ method: METHOD_POST, route: USER_LOGIN_ROUTE, body: { user: firebaseUser } }, ({ success, user }) => {
        callback(user)
    }, (error) => {
        onError(error)
    })
});

export const logUserUsingToken = ((token, callback, onError = (error) => console.log(error)) => {
    restRequest({ method: METHOD_POST, route: USER_LOGIN_ROUTE, body: { token } }, ({ success, user }) => {
        callback(user)
    }, (error) => {
        onError(error)
    })
});

export const testNotifications = ((callback, onError = (error) => console.log(error)) => {
    restAuthRequest({ method: METHOD_GET, route: USER_TEST_NOTIFICATIONS_ROUTE }, () => {
        callback()
    }, (error) => {
        onError(error)
    })
});

export const getUserList = ((callback, onError = (error) => console.log(error)) => {
    restAuthRequest({ method: METHOD_GET, route: USER_LIST_ROUTE }, ({ success, user_list }) => {
        if (success) {
            callback(user_list)
            return
        }
        callback([])
    }, (error) => {
        onError(error)
    })
});
