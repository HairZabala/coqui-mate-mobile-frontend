import theme from '@utils/theme';
import React, { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import AppKeyboardAvoidingView, { AppKeyboardAvoidingViewProps } from './AppKeyboardAvoidingView';

interface AppKeyboardAvoidingSafeAreaViewProps extends AppKeyboardAvoidingViewProps {
  safeAreaEdges?: readonly Edge[] | undefined;
  children: ReactNode;
}

const AppKeyboardAvoidingSafeAreaView: FC<AppKeyboardAvoidingSafeAreaViewProps> = ({
  safeAreaEdges = ['bottom'],
  children,
  ...rest
}) => {
  return (
    <SafeAreaView edges={safeAreaEdges} style={styles.safeArea}>
      <AppKeyboardAvoidingView {...rest}>{children}</AppKeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
});

export default AppKeyboardAvoidingSafeAreaView;
