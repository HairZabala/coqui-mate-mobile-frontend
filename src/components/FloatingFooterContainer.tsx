import { useHeaderHeight } from '@react-navigation/elements';
import theme from '@utils/theme';
import React, { FC } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface FloatingFooterContainerProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const FloatingFooterContainer: FC<FloatingFooterContainerProps> = (props) => {
  const { children } = props;

  // Adjusts keyboard avoiding view when in a stack screen with a header
  const headerHeight = useHeaderHeight();

  // Adjusts keyboard avoiding view when using an iPhone X style device with bottom space offsets
  const bottomSpace = getBottomSpace();

  return (
    <KeyboardAvoidingView
      style={styles.footer}
      keyboardVerticalOffset={headerHeight - bottomSpace}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.contentContainer}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    marginBottom: 16 + getBottomSpace(),
  },
  footer: {
    width: '100%',
    paddingHorizontal: theme.spacing.horizontalDefault,
  },
});

export default FloatingFooterContainer;
