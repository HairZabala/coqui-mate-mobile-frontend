import theme from '@utils/theme';
import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import AppErrorLabel from './AppError';
import AppText from './AppText';

export interface AppFieldContainerProps {
  title?: string;
  showError: boolean;
  error?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  fieldContainerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const AppFieldContainer: FC<AppFieldContainerProps> = (props) => {
  const { title, showError, error, titleStyle, containerStyle, fieldContainerStyle, children } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {title !== undefined && <AppText style={[styles.title, titleStyle]}>{title}</AppText>}
      <View style={[styles.fieldContainer, fieldContainerStyle]}>{children}</View>
      {showError && error && <AppErrorLabel>{error}</AppErrorLabel>}
    </View>
  );
};

export default AppFieldContainer;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    marginBottom: 24,
  },
  fieldContainer: {
    justifyContent: 'center',
    minHeight: 50,
    borderRadius: 16,
  },
  title: {
    fontFamily: theme.fonts.poppins400,
  },
});
