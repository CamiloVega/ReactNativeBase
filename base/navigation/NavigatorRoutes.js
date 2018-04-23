
import {StackNavigator} from 'react-navigation';
import LoginView from '../components/login/LoginView'
import ProfileView from '../components/profile/ProfileView'

  export const RootNavigator = StackNavigator({
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