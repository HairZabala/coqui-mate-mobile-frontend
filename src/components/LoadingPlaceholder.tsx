import theme from '@utils/theme';
import React, { FC } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  height: number;
  width: number;
  containerStyle?: ViewStyle;
  color?: string;
  translateVal: Animated.Value;
  opacityVal: Animated.Value;
}
const LoadingPlaceholder: FC<Props> = ({
  height,
  width,
  containerStyle,
  color,
  translateVal = new Animated.Value(0),
  opacityVal = new Animated.Value(1),
}) => {
  const screenWidth = useWindowDimensions().width;
  const heightGuard = !isNaN(height) ? height : 1;
  const widthGuard = !isNaN(width) ? width : 1;

  return (
    <View style={[styles.container, { height: heightGuard, width: widthGuard }, containerStyle]}>
      <Animated.View style={[styles.animatedContainer, { transform: [{ translateX: translateVal }] }]}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            'rgba(0, 0, 0,0)',
            'rgba(0, 0, 0,0.04)',
            'rgba(0, 0, 0,0.06)',
            'rgba(0, 0, 0,0.06)',
            'rgba(0, 0, 0,0.04)',
            'rgba(0, 0, 0,0)',
          ]}
          style={{
            height: heightGuard,
            width: screenWidth,
          }}
        />
      </Animated.View>
      <Animated.View style={{ height: heightGuard, width: widthGuard, backgroundColor: color, opacity: opacityVal }} />
    </View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    zIndex: 1,
    position: 'absolute',
  },
  container: {
    overflow: 'hidden',
    backgroundColor: theme.colors.black,
  },
});

export default LoadingPlaceholder;
