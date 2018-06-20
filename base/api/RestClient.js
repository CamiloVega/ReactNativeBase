import React from 'react';
import { USER_LOGIN_ROUTE, USER_TEST_NOTIFICATIONS_ROUTE, USER_LIST_ROUTE } from './ApiRoutes'
import { restRequest, restAuthRequest } from './RestRequest'
const METHOD_POST = 'POST'
const METHOD_GET = 'GET'

export const logFirebaseUser = firebaseUser =>
    restRequest({ method: METHOD_POST, route: USER_LOGIN_ROUTE, body: { user: firebaseUser } })
        .then(({ success, user }) => {
            if (success) return user
            throw 'error from the server'
        })

export const logUserUsingToken = token =>
    restRequest({ method: METHOD_POST, route: USER_LOGIN_ROUTE, body: { token } })
        .then(({ success, user }) => {
            if (success) return user
            throw 'error from the server'
        })

export const testNotifications = () => restAuthRequest({ method: METHOD_GET, route: USER_TEST_NOTIFICATIONS_ROUTE })

export const getUserList = () =>
    restAuthRequest({ method: METHOD_GET, route: USER_LIST_ROUTE })
        .then(({ success, user_list }) => {
            if (success) return user_list
            throw 'error from the server'
        })

