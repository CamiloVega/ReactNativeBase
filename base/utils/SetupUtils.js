import { GoogleSignin } from 'react-native-google-signin'
import firebase from 'firebase'
import { Platform } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';
import {firebaseKeys, googleSignInKeys} from '../config-files/keys'

export async function setupGoogleSignIn() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure(googleSignInKeys);
}

export async function initializeFireBase() {
    firebase.initializeApp(firebaseKeys);
}