import theme from '@utils/theme';
import React, { FC } from 'react';
import {
  ActivityIndicator,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import AnimatedGradientTransition from './AnimatedGradientTransition';

const BUTTON_HEIGHT = 50;

export interface BlockButtonProps {
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  gradientStyle?: StyleProp<ViewStyle>;
  text: string;
  textColor?: string;
  loadingIndicatorColor?: string;
  loadingIndicatorStyle?: string;
  gradient?: Array<string>;
  loading?: boolean;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  gradientTransitionDuration?: number;
  SuffixComponent?: React.ReactElement;
  PrefixComponent?: React.ReactElement;
}

const GRADIENT_START = {
  x: -0.03,
  y: 0.47,
};

const GRADIENT_END = {
  x: 1.03,
  y: 0.53,
};

const BlockButton: FC<BlockButtonProps> = ({
  onPress,
  containerStyle,
  bodyStyle,
  gradientStyle,
  text,
  textColor = theme.colors.white,
  loadingIndicatorColor = theme.colors.white,
  gradient = ['rgb(37, 155, 228)', 'rgb(1, 116, 185)'],
  loading,
  disabled,
  textStyle,
  gradientTransitionDuration = 150,
  SuffixComponent,
  PrefixComponent,
}) => {
  const transitionConfig = {
    toValue: 1,
    duration: gradientTransitionDuration,
    easing: Easing.linear,
  };

  return (
    <Pressable style={[{ height: BUTTON_HEIGHT }, containerStyle]} onPress={onPress} disabled={loading || disabled}>
      <AnimatedGradientTransition
        start={GRADIENT_START}
        end={GRADIENT_END}
        locations={[0, 1]}
        colors={gradient}
        animated={transitionConfig}
        style={[styles.gradient, gradientStyle]}>
        {loading && <ActivityIndicator size='small' color={loadingIndicatorColor} />}
        {!loading && (
          <View style={[styles.body, bodyStyle]}>
            {PrefixComponent !== undefined && PrefixComponent}
            <Text style={[styles.buttonText, textStyle, { color: textColor }]}>{text}</Text>
            {SuffixComponent !== undefined && SuffixComponent}
          </View>
        )}
      </AnimatedGradientTransition>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
  },
  gradient: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});

export default BlockButton;
