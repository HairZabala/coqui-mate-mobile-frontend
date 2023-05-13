import theme from '@utils/theme';
import React, { FC } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { ACTION_POPUP_BUTTON_AFFIRMATIVE, ACTION_POPUP_BUTTON_NEUTRAL } from '../utils/constants';
import BlockButton from './BlockButton';

export interface Button {
  text: string;
  type: ButtonTypes;
  onPress: () => void;
}

export enum ButtonTypes {
  Affirmative = ACTION_POPUP_BUTTON_AFFIRMATIVE,
  Neutral = ACTION_POPUP_BUTTON_NEUTRAL,
}

export interface ActionPopupProps {
  visible: boolean;
  title: string;
  body: string;
  onBackdropPress: () => void;
  buttons: Array<Button>;
  boxStyle?: ViewStyle;
}

const ActionPopup: FC<ActionPopupProps> = ({ visible, title, body, onBackdropPress, buttons, boxStyle }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onBackdropPress}>
      <View style={styles.container}>
        <View style={[styles.box, boxStyle]}>
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            {buttons?.map((button, index) => {
              return (
                <BlockButton
                  key={index}
                  text={button?.text}
                  onPress={() => button?.onPress?.()}
                  textColor={button?.type === ACTION_POPUP_BUTTON_NEUTRAL ? 'grey' : '#FFF'}
                  containerStyle={StyleSheet.flatten([
                    styles.buttonContainer,
                    {
                      marginRight: index < buttons?.length ? 3 : 0,
                    },
                  ])}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  body: {
    fontFamily: theme.fonts.system,
    fontSize: 15,
    color: theme.colors.black,
    opacity: 0.5,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  bodyContainer: {
    alignItems: 'center',
  },
  box: {
    minHeight: 246,
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    marginHorizontal: 30,
    width: '100%',
    maxWidth: 315,
    paddingTop: 39,
  },
  buttonContainer: {
    marginBottom: 21,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: 25,
    marginTop: 35,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.fonts.system,
    fontSize: 22,
    color: theme.colors.black,
    textAlign: 'center',
  },
});

export default ActionPopup;
