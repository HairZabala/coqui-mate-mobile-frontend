import { ApolloProvider } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import { Platform, StyleSheet, Text, TextInput, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import client from './client';
import AppStateSideEffects from './features/appState/AppStateSideEffects';
import ModalNavigator from './navigators/ModalNavigator';
import NetworkStatusProvider from './providers/NetworkStatusProvider';
import store, { persistor } from './store';
import { configureAxios } from './utils/api';

// Disable font scaling
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

const App: FC = () => {
  useEffect(() => {
    configureAxios(store);
  }, []);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={client}>
            <NetworkStatusProvider>
              <ModalNavigator />
              <AppStateSideEffects />
            </NetworkStatusProvider>
          </ApolloProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
