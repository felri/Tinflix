import 'react-native-gesture-handler';
import React from 'react';
import {AsyncStorage, StatusBar, SafeAreaView} from 'react-native';
import Theme from './src/utils/Theme';
import SplashScreen from 'react-native-splash-screen';

//REDUX IMPORTS
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from 'src/redux';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';

//NAVIGATION STUFF
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeSvg, SettingsSvg, HeartSvg} from './src/utils/svgIcons';
const Tab = createBottomTabNavigator();

//SCREENS
import Home from './src/screens/Home';
import Favorites from './src/screens/Favorites';
import Settings from './src/screens/Settings';

//REDUX STUFF
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);

const App: () => React$Node = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.colors.secondary}
        />
        <NavigationContainer initialRouteName="Home">
          <Tab.Navigator
            tabBarOptions={{
              showLabel: false,
              activeTintColor: Theme.colors.red,
              activeBackgroundColor: Theme.colors.navigation,
              inactiveBackgroundColor: Theme.colors.navigation,
              style: {
                borderTopWidth: 0,
              },
            }}>
            <Tab.Screen
              options={{
                showLabel: false,
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                  <HomeSvg fill={color} width={size} height={size} />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Tab.Screen
              options={{
                tabBarLabel: 'Likes',
                tabBarIcon: ({color, size}) => (
                  <HeartSvg fill={color} width={size} height={size} />
                ),
              }}
              name="Likes"
              component={Favorites}
            />
            <Tab.Screen
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({color, size}) => (
                  <SettingsSvg fill={color} width={size} height={size} />
                ),
              }}
              name="Settings"
              component={Settings}
            />
          </Tab.Navigator>
        </NavigationContainer>
        {/* <SafeAreaView> */}
        {/* </SafeAreaView> */}
      </PersistGate>
    </Provider>
  );
};

export default App;
