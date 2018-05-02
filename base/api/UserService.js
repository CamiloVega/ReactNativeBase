import React from 'react';
import * as RestClient from './RestClient'
// import * as UserUtil from '../Utils/UserUtil'

export const logUserOnServer = ((user, callback) => {
    console.log('USER')
    console.log(JSON.stringify(user))
    RestClient.logUser(user, (userResponse) => {
        global.authToken = userResponse.token
        callback(userResponse)}) // this is where error handling should happen. 
});

export const testUserNotifications = ((callback) => {
    console.log("testUserNotifications Service")
    RestClient.testNotifications(() => {
        callback()
    })
});

// export let getCurrentUser = ((userToken, callback) => {
//     RestClient.getCurrentUser(userToken,  (response) => {
//         if (response != null && response.user != null){
//             let user =  response.user
//             UserUtil.updateCurrentUser(user, () => {
//                 let userCredentials = user.token    
//                 UserUtil.updateLoginCredentials(userCredentials, () => {
//                         callback(user)
//                 })
//             })
//         } else {
//             callback(null)
//         }  
//     })
// });