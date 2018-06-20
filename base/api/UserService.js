import React from 'react';
import * as RestClient from './RestClient'

export const logUserOnServer = (user) => RestClient.logFirebaseUser(user)   

export const logUserUsingTokenServer = (token) => RestClient.logUserUsingToken(token)

export const testUserNotifications = () => RestClient.testNotifications()

export const getUserList = () =>  RestClient.getUserList()
