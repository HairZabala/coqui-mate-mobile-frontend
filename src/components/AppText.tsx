import theme from '@utils/theme';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextInputProps, TextStyle } from 'react-native';

export interface AppTextProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: string;
}

const AppText: FC<AppTextProps> = ({ size = 16, color = theme.colors.black, style, children, ...otherProps }) => {
  return (
    <Text style={[styles.text, { fontSize: size, color: color }, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.system,
    fontSize: 16,
  },
});

export default AppText;
