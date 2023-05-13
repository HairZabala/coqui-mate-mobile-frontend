import React, { FC } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import theme from '../utils/theme';
import AppText, { AppTextProps } from './AppText';

interface AppErrorLabelProps extends AppTextProps {
  style?: TextStyle;
}

const AppErrorLabel: FC<AppErrorLabelProps> = ({ style, children, ...rest }) => {
  return (
    <AppText color={theme.colors.error} size={13} style={[styles.errorText, style]} {...rest}>
      {children}
    </AppText>
  );
};

const styles = StyleSheet.create({
  errorText: {
    lineHeight: 18,
    marginTop: 5,
  },
});

export default AppErrorLabel;
