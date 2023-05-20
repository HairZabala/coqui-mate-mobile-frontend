import { useStatusBar } from '@hooks/useStatusBar';
import { useHeaderHeight } from '@react-navigation/elements';
import theme from '@utils/theme';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LeftBanner from '../components/LeftBanner';
import LoginForm from '../components/LoginForm';

const Login = () => {
  useStatusBar('dark-content', theme.colors.black, false);
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : headerHeight + 20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <LeftBanner />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.containerRight}>
            <LoginForm />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  containerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default Login;
