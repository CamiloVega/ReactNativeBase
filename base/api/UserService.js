import React from 'react';
import * as RestClient from './RestClient'

export const logUserOnServer = ((user, callback) => {
    RestClient.logUser(user, (userResponse) => {
        callback(userResponse)}) // this is where error handling should happen. 
});

export const logUserUsingTokenServer = ((token, callback) => {
    RestClient.logUserUsingToken(token, (userResponse) => {
        callback(userResponse)}) // this is where error handling should happen. 
});

export const testUserNotifications = ((callback) => {
    RestClient.testNotifications(() => {
        callback()
    })
});

export const getUserList = ((callback) => {
    RestClient.getUserList((userList) => {
        callback(userList)
    })
});
