// navigation
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
import AuthenticationMobileNumber from '../features/onboarding/containers/AuthenticationMobileNumber';
import AuthenticationVerificationCode from '../features/onboarding/containers/AuthenticationVerificationCode';
import slideStackOptions from './navigationOptions/slideStackOptions';
// utils
import LoginScreen from '@features/auth/containers/LoginScreen';
import {
  ROUTE_AUTHENTICATION_LOGIN,
  ROUTE_AUTHENTICATION_MOBILE_NUMBER,
  ROUTE_AUTHENTICATION_VERIFICATION_CODE,
} from './routeNames';

export type AuthenticationStackParamList = {
  [ROUTE_AUTHENTICATION_LOGIN]: undefined;
  [ROUTE_AUTHENTICATION_MOBILE_NUMBER]: { country?: string; countryCode?: string | undefined };
  [ROUTE_AUTHENTICATION_VERIFICATION_CODE]: { mobileNumber: string };
};

const Stack = createStackNavigator<AuthenticationStackParamList>();

const AuthenticationNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_AUTHENTICATION_LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ROUTE_AUTHENTICATION_MOBILE_NUMBER}
        component={AuthenticationMobileNumber}
        options={{ ...slideStackOptions, title: '' }}
      />
      <Stack.Screen
        name={ROUTE_AUTHENTICATION_VERIFICATION_CODE}
        component={AuthenticationVerificationCode}
        options={{ ...slideStackOptions, title: '' }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
