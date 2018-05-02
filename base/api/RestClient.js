import React from 'react';
import { USER_LOGIN_ROUTE, USER_TEST_NOTIFICATIONS_ROUTE } from './ApiRoutes'
import {restRequest, restAuthRequest} from './RestRequest'
const METHOD_POST = 'POST'
const METHOD_GET = 'GET'

export const logUser = ((firebaseUser, callback) => {
    restRequest(METHOD_POST, USER_LOGIN_ROUTE, {user: firebaseUser}, ({user}) => {
        callback(user)
    })
});

export const testNotifications = ((callback) => {
    restAuthRequest(METHOD_GET, USER_TEST_NOTIFICATIONS_ROUTE, () => {
        callback()
    })
});
