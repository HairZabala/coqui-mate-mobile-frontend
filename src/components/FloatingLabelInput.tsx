import theme from '@utils/theme';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import usePrevious from '../hooks/usePrevious';
import useUpdateEffect from '../hooks/useUpdateEffect';

const PLACEHOLDER_SCALE_AFTER = 0.75;
const PLACEHOLDER_X_AFTER = -16;
const PLACEHOLDER_Y_AFTER = Platform.OS === 'ios' ? -18 : -12;
const INPUT_TOP_MARGIN = 15;

export interface FloatingLabelInputProps extends TextInputProps {
  placeholder?: string;
  value: string;
  maxCharacters?: number;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  onLayout?: () => void;
  hasError?: boolean;
  innerRef: RefObject<TextInput>;
  InputRightComponent?: React.ComponentType;
  InputLeftComponent?: React.ComponentType;
  containerProps?: ViewProps;
  children?: React.ReactNode;
}

const FloatingLabelInput = ({
  placeholder,
  value,
  maxCharacters,
  secureTextEntry,
  containerStyle,
  onLayout,
  hasError,
  InputRightComponent,
  InputLeftComponent,
  containerProps,
  innerRef,
  ...rest
}: FloatingLabelInputProps) => {
  const [_secureTextEntry, setSecureTextEntry] = useState(secureTextEntry);
  const placeholderScale = useRef(new Animated.Value(value ? PLACEHOLDER_SCALE_AFTER : 1)).current;
  const placeholderY = useRef(new Animated.Value(value ? PLACEHOLDER_Y_AFTER : 0)).current;
  const placeholderX = useRef(new Animated.Value(value ? PLACEHOLDER_X_AFTER : 0)).current;

  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [inputWidth, setInputWidth] = useState(0);
  const previousValue = usePrevious(value);
  const previousInputWidth = usePrevious(inputWidth);

  useEffect(() => {
    if (previousInputWidth === 0 && inputWidth !== 0) {
      if (value) {
        placeholderX.setValue((inputWidth * PLACEHOLDER_SCALE_AFTER - inputWidth) / 2);
      } else {
        placeholderX.setValue(0);
      }
    }
  }, [inputWidth, value, placeholderX, previousInputWidth]);

  // If the value is set programmatically rather than via user input
  // then placeholder position needs to be manually updated
  useUpdateEffect(() => {
    if (!previousValue && value) {
      placeholderScale.setValue(PLACEHOLDER_SCALE_AFTER);
      placeholderY.setValue(PLACEHOLDER_Y_AFTER);
      placeholderX.setValue((inputWidth * PLACEHOLDER_SCALE_AFTER - inputWidth) / 2);
    }
  }, [value]);

  const _onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    Animated.parallel([
      Animated.timing(placeholderY, {
        toValue: PLACEHOLDER_Y_AFTER,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(placeholderX, {
        toValue: (inputWidth * PLACEHOLDER_SCALE_AFTER - inputWidth) / 2,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(placeholderScale, {
        toValue: PLACEHOLDER_SCALE_AFTER,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    rest.onFocus?.(event);
  };

  const _onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (value === '') {
      Animated.parallel([
        Animated.timing(placeholderY, {
          toValue: 5,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderX, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(placeholderScale, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }

    rest.onBlur?.(event);
  };

  const onLayoutPlaceholder = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;

    setPlaceholderHeight(height);
  };

  const onInputLayout = (e: LayoutChangeEvent) => {
    setInputWidth(e?.nativeEvent?.layout?.width);
  };

  return (
    <View style={containerStyle} {...containerProps} onLayout={onLayout}>
      <TouchableWithoutFeedback
        onPress={() => {
          innerRef.current?.focus();
        }}>
        <View style={styles.contentContainer} onLayout={onInputLayout}>
          <Animated.View
            style={[
              styles.placeholderContainer,
              {
                height: placeholderHeight,
                width: inputWidth,
                top: INPUT_TOP_MARGIN - placeholderHeight / 2,
                transform: [{ translateY: placeholderY }],
              },
            ]}>
            <Animated.Text
              onLayout={onLayoutPlaceholder}
              numberOfLines={1}
              style={[
                styles.placeholder,
                {
                  width: inputWidth,
                  transform: [{ translateX: placeholderX }, { scale: placeholderScale }],
                },
              ]}>
              {placeholder}
            </Animated.Text>
          </Animated.View>
          <View style={styles.inputContainer}>
            {InputLeftComponent && <InputLeftComponent />}
            <TextInput
              secureTextEntry={_secureTextEntry}
              ref={innerRef}
              scrollEnabled={false}
              onFocus={_onFocus}
              onBlur={_onBlur}
              value={value}
              style={styles.input}
              selectionColor={theme.colors.black}
              {...rest}
            />
            {secureTextEntry && (
              <TouchableOpacity
                delayPressIn={250}
                onPress={() => setSecureTextEntry(!_secureTextEntry)}
                style={styles.secureEntryContainer}>
                <Image source={require('../../assets/images/show-ic.png')} />
              </TouchableOpacity>
            )}
            {InputRightComponent && <InputRightComponent />}
          </View>
          {maxCharacters !== undefined && value?.length > 0 && maxCharacters > 0 && (
            <Text style={styles.maxCharacters}>{Math.max(0, maxCharacters - value?.length)} characters remaining</Text>
          )}
          <View style={[styles.separator, { backgroundColor: hasError ? theme.colors.error : theme.colors.black }]} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: 57,
    justifyContent: 'flex-start',
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 0,
    fontSize: 16,
    letterSpacing: 0.2,
    color: theme.colors.black,
    paddingBottom: Platform.OS === 'ios' ? 5 : 0,
    marginTop: INPUT_TOP_MARGIN * 2,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
  },
  maxCharacters: {
    fontSize: 13,
    color: theme.colors.black,
    fontFamily: theme.fonts.system,
    marginBottom: 15,
    opacity: 0.5,
  },
  placeholder: {
    fontFamily: theme.fonts.system,
    fontSize: 16,
    color: theme.colors.black,
    letterSpacing: 0.2,
    lineHeight: 20,
    position: 'absolute',
    textAlign: 'left',
  },
  placeholderContainer: {
    marginTop: 20,
    position: 'absolute',
    justifyContent: 'flex-start',
  },
  secureEntryContainer: {
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: 15,
    paddingLeft: 15,
  },
  separator: {
    height: 1,
  },
});

export default FloatingLabelInput;
