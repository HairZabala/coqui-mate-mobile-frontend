// Packages
import { createStackNavigator } from '@react-navigation/stack';
import React, { FC } from 'react';
// Screens
import Dashboard from '../features/dashboard/containers/Dashboard';
// Routes
import { ROUTE_DASHBOARD } from './routeNames';

export type AuthenticatedStackParamList = {
  [ROUTE_DASHBOARD]: undefined;
};

const Stack = createStackNavigator<AuthenticatedStackParamList>();

export const AuthenticatedStackNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_DASHBOARD}
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedStackNavigator;
