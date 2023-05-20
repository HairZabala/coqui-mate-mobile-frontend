import LeftBannerImage from '@assets/images/left-banner.png';
import AppText from '@components/AppText';
import theme from '@utils/theme';
import React, { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LeftBanner: FC = () => {
  return (
    <View style={styles.leftBanner}>
      <View style={styles.container}>
        <AppText style={styles.logoLabel} size={40}>
          Coqui Mate
        </AppText>
        <View>
          <View style={styles.divider} />
          <AppText style={styles.description} size={27}>
            Coqui Mate permite a los usuarios optimizar sus procesos, mejorar su rendimiento y lograr una mayor
            eficiencia operativa.
          </AppText>
        </View>
      </View>
      <Image source={LeftBannerImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 50,
    paddingVertical: 90,
    zIndex: 100,
  },
  description: {
    width: '85%',
    color: theme.colors.white,
    fontFamily: theme.fonts.poppins600,
  },
  divider: {
    backgroundColor: theme.colors.white,
    width: '50%',
    height: 12,
    borderRadius: 35,
    marginVertical: 35,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  leftBanner: {
    flex: 1,
    maxWidth: '40%',
  },
  logoLabel: {
    color: theme.colors.white,
    fontFamily: theme.fonts.dancingScript700,
  },
});

export default LeftBanner;
