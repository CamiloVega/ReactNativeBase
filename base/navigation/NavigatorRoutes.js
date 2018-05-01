
import {StackNavigator} from 'react-navigation';
import LoginView from '../components/login/LoginView'
import ProfileView from '../components/profile/ProfileView'
import PassThroughView from '../components/passthrough/PassThroughView'

  export const RootNavigator = StackNavigator({
    PassThrough: { 
        screen: PassThroughView,
        navigationOptions: { header: null} 
    },
    Login: { 
        screen: LoginView,
        navigationOptions: { header: null} 
    },
    Profile: { 
        screen: ProfileView,
    }
  }, {
      navigationOptions: ({navigation}) => ({
      }),
  });