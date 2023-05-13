import theme from '@utils/theme';
import React, { FC } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface Props {
  style?: TextStyle;
  size?: number;
  color?: string;
}

export type TitleProps = Props & TextProps;

const Title: FC<Props & TextProps> = ({ style, size = 24, color = theme.colors.black, children }) => {
  return <Text style={[styles.text, { fontSize: size, color: color }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: theme.fonts.poppins400,
  },
});

export default Title;
