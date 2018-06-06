import React from 'react';
import * as RestClient from './RestClient'

export const logUserOnServer = ((user, callback, onError = (error) => console.log(error)) => {
    RestClient.logUser(user, (userResponse) => {
        callback(userResponse)
    }, onError)
});

export const logUserUsingTokenServer = ((token, callback, onError = (error) => console.log(error)) => {
    RestClient.logUserUsingToken(token, (userResponse) => {
        callback(userResponse)
    }, onError)
});

export const testUserNotifications = ((callback, onError = (error) => console.log(error)) => {
    RestClient.testNotifications(() => {
        callback()
    }, onError)
});

export const getUserList = ((callback, onError = (error) => console.log(error)) => {
    RestClient.getUserList((userList) => {
        callback(userList)
    }, onError)
});
