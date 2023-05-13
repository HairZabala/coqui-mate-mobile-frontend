import theme from '@utils/theme';
import React, { FC, ReactNode } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export enum KeyboardAvoidingChildContainerType {
  ScrollView = 'SCROLL_VIEW',
  None = 'NONE',
  AnimatedScrollView = 'ANIMATED_SCROLL_VIEW',
}
export interface AppKeyboardAvoidingViewProps {
  childContainerType?: KeyboardAvoidingChildContainerType;
  keyboardAvoidingStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  scrollStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
  FooterElement?: ReactNode;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

const AppKeyboardAvoidingView: FC<AppKeyboardAvoidingViewProps> = ({
  childContainerType = KeyboardAvoidingChildContainerType.ScrollView,
  keyboardVerticalOffset,
  keyboardAvoidingStyle,
  scrollContainerStyle,
  scrollStyle,
  FooterElement,
  children,
  onScroll,
}) => {
  const commonScrollProps = {
    style: [styles.scroll, scrollStyle],
    contentContainerStyle: [styles.scrollContainer, scrollContainerStyle],
    showsVerticalScrollIndicator: false,
    onScroll: onScroll,
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.keyboardAvoidingView, keyboardAvoidingStyle]}
        contentContainerStyle={styles.keyboardAvoidingContainer}>
        {childContainerType === KeyboardAvoidingChildContainerType.AnimatedScrollView && (
          <Animated.ScrollView {...commonScrollProps}>{children}</Animated.ScrollView>
        )}
        {childContainerType === KeyboardAvoidingChildContainerType.ScrollView && (
          <ScrollView {...commonScrollProps} scrollEventThrottle={16}>
            {children}
          </ScrollView>
        )}
        {childContainerType === KeyboardAvoidingChildContainerType.None && <>{children}</>}
        {FooterElement}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingContainer: {
    flexGrow: 1,
  },
  keyboardAvoidingView: {
    flexGrow: 1,
    backgroundColor: theme.colors.white,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.horizontalDefault,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default AppKeyboardAvoidingView;
