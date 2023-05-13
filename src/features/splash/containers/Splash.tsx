import AppText from '@components/AppText';
import theme from '@utils/theme';
import React, { FC, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import Animated, { Easing, FadeIn } from 'react-native-reanimated';

const Splash: FC = () => {
  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.content} entering={FadeIn.delay(120).easing(Easing.linear)}>
        <Image source={require('@assets/images/bootsplash_logo.png')} />
        <AppText style={styles.splashText}>CoquiMate</AppText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontFamily: theme.fonts.dancingScript700,
    color: theme.colors.white,
    fontSize: 36,
    marginTop: 4,
  },
});

export default Splash;
