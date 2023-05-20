import useAuthToken from '@hooks/useAuthToken';
import { NavigatorScreenParams } from '@react-navigation/core';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import CountryCodeSelectScreen from '../containers/CountryCodeSelectScreen';
import Splash from '../features/splash/containers/Splash';
import usePrevious from '../hooks/usePrevious';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { SPLASH_ANIM_RUNTIME_MS } from '../utils/constants';
import { navigationRef } from '../utils/rootNavigation';
import AuthenticatedStackNavigator from './AuthenticatedStackNavigator';
import AuthenticationNavigator, { AuthenticationStackParamList } from './AuthenticationNavigator';
import defaultModalOptions from './navigationOptions/defaultModalOptions';
import splashTransitionOptions from './navigationOptions/splashTransitionOptions';
import {
  ROUTE_AUTHENTICATED_NAVIGATOR,
  ROUTE_AUTHENTICATION_NAVIGATOR,
  ROUTE_COUNTRY_CODE_SELECT,
  ROUTE_LANDING,
  ROUTE_SPLASH,
  ROUTE_VALUE_SLIDES,
} from './routeNames';

export type ModalNavigatorParamList = {
  [ROUTE_SPLASH]: undefined;
  [ROUTE_VALUE_SLIDES]: undefined;
  [ROUTE_LANDING]: undefined;
  [ROUTE_AUTHENTICATION_NAVIGATOR]: NavigatorScreenParams<AuthenticationStackParamList> | undefined;
  [ROUTE_AUTHENTICATED_NAVIGATOR]: undefined;
  [ROUTE_COUNTRY_CODE_SELECT]: { onCountryCodeSelected: (countryCode: string) => void };
};

const ModalStack = createStackNavigator<ModalNavigatorParamList>();

const ModalNavigator: FC = () => {
  const [authToken] = useAuthToken();
  const previousAuthToken = usePrevious(authToken);

  const [splashActive, setSplashActive] = useState(true);

  /*
    Skip the splash screen animation if running dev builds
    to preserve the developers sanity
  */
  useEffect(() => {
    setTimeout(
      () => {
        setSplashActive(false);
      },
      __DEV__ ? SPLASH_ANIM_RUNTIME_MS : SPLASH_ANIM_RUNTIME_MS,
    );
  }, []);

  useUpdateEffect(() => {
    if (previousAuthToken && !authToken) {
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: ROUTE_LANDING }],
      });
    }
  }, [previousAuthToken, authToken]);

  return (
    <NavigationContainer ref={navigationRef}>
      <ModalStack.Navigator
        screenOptions={{ presentation: 'modal', cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS }}>
        {splashActive && <ModalStack.Screen name={ROUTE_SPLASH} component={Splash} options={splashTransitionOptions} />}
        {/* {!valueSlidesSeen && (
          <ModalStack.Screen name={ROUTE_VALUE_SLIDES} component={ValueSlides} options={splashTransitionOptions} />
        )} */}
        {authToken === null && (
          <ModalStack.Screen
            name={ROUTE_AUTHENTICATION_NAVIGATOR}
            component={AuthenticationNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}
        {authToken !== null && (
          <ModalStack.Screen
            name={ROUTE_AUTHENTICATED_NAVIGATOR}
            component={AuthenticatedStackNavigator}
            options={splashTransitionOptions}
          />
        )}
        <ModalStack.Screen
          name={ROUTE_COUNTRY_CODE_SELECT}
          component={CountryCodeSelectScreen}
          options={{ ...defaultModalOptions, title: 'Country Code' }}
        />
      </ModalStack.Navigator>
    </NavigationContainer>
  );
};

export default ModalNavigator;
