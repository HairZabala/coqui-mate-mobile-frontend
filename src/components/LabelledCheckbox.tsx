import { BUTTON_PRESS_DELAY } from '@utils/constants';
import theme from '@utils/theme';
import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import AppText from './AppText';
import Checkbox from './CheckBox';

export interface LabelledCheckboxProps {
  name?: string;
  checked: boolean;
  onPress: (checked: boolean) => void;
  containerStyle?: StyleProp<ViewStyle>;
  nameComponent?: ReactNode;
}

const LabelledCheckbox: FC<LabelledCheckboxProps> = ({ checked, name, onPress, nameComponent, containerStyle }) => {
  return (
    <TouchableOpacity
      delayPressIn={BUTTON_PRESS_DELAY}
      onPress={() => onPress(!checked)}
      style={[styles.container, containerStyle]}>
      <Checkbox selected={checked} disabled />
      <View style={styles.textContainer}>
        {nameComponent ?? (
          <AppText style={styles.title} size={14}>
            {name}
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontFamily: theme.fonts.system,
    color: theme.colors.black,
  },
});

export default LabelledCheckbox;
