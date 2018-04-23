import { GoogleSignin } from 'react-native-google-signin'
import firebase from 'firebase'
import { Platform } from 'react-native';
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';


export async function setupGoogleSignIn() {
    await GoogleSignin.hasPlayServices({ autoResolve: true });
    await GoogleSignin.configure({
        webClientId: '24723480971-ppb47lfjmebtiosghd1uru7elk3de7ac.apps.googleusercontent.com',
        iosClientId: '24723480971-33lc641ljgt00cpao7lhqgn87pqt619a.apps.googleusercontent.com',
        offlineAccess: false
    });
}

export async function initializeFireBase() {
    firebase.initializeApp({
        apiKey: 'AIzaSyAmzaPMCyvM031kk7G3e54oNbIa-vw5zy0',
        authDomain: 'base-cvdevelopers-react.firebaseapp.com',
        databaseURL: 'https://base-cvdevelopers-react.firebaseio.com',
        projectId: 'base-cvdevelopers-react',
        storageBucket: 'base-cvdevelopers-react.appspot.com',
        messagingSenderId: '24723480971'
    });
}

export async function initializeFirebaseMessaging() {
    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions()
        .then(() => { })
        .catch(() => {
            console.log('notification permission rejected')
            return
        });

    FCM.getFCMToken()
    .then(token => {
        // store fcm token in your server
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        // optional, do some component related stuff
    });

    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then(notif => {
    });
}

FCM.on(FCMEvent.Notification, async (notif) => {
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    if (notif.local_notification) {
        //this is a local notification
    }
    if (notif.opened_from_tray) {
        //iOS: app is open/resumed because user clicked banner
        //Android: app is open/resumed because user clicked banner or tapped app icon
    }
    // await someAsyncCall();

    if (Platform.OS === 'ios') {
        //optional
        //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //notif._notificationType is available for iOS platfrom
        switch (notif._notificationType) {
            case NotificationType.Remote:
                notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                break;
            case NotificationType.NotificationResponse:
                notif.finish();
                break;
            case NotificationType.WillPresent:
                notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                break;
        }
    }
});

FCM.on(FCMEvent.RefreshToken, (token) => {
    // fcm token may not be available on first load, catch it here
});