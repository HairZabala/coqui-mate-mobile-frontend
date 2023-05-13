import theme from '@utils/theme';
import React, { FC, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const Splash: FC = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <View style={styles.container}>
      {/*
        Add animated splash screen content
      */}
      <Image source={require('@assets/images/bootsplash_logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
