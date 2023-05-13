import AppText from '@components/AppText';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import BlockButton from '../../../components/BlockButton';
import { AuthenticatedStackParamList } from '../../../navigators/AuthenticatedStackNavigator';
import { ROUTE_DASHBOARD } from '../../../navigators/routeNames';
import { LOGOUT } from '../../auth/store/authTypes';

type NameScreenRouteProp = RouteProp<AuthenticatedStackParamList, typeof ROUTE_DASHBOARD>;
type NameScreenNavigationProp = StackNavigationProp<AuthenticatedStackParamList, typeof ROUTE_DASHBOARD>;

interface Props {
  navigation: NameScreenNavigationProp;
  route: NameScreenRouteProp;
}

const Dashboard: FC<Props> = () => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Dashboard</AppText>
      <BlockButton
        text='Logout'
        onPress={() => {
          dispatch({ type: LOGOUT });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    marginBottom: 40,
  },
});

export default Dashboard;
