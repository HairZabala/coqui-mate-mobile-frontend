import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '@utils/theme';
import parsePhoneNumberFromString from 'libphonenumber-js';
import React, { FC, useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../../components/AppTextInput';
import BlockButton from '../../../components/BlockButton';
import { useUserSendPhoneNumberVerificationCodeMutation } from '../../../graphql/generated';
import { AuthenticationStackParamList } from '../../../navigators/AuthenticationNavigator';
import { ModalNavigatorParamList } from '../../../navigators/ModalNavigator';
import {
  ROUTE_AUTHENTICATION_MOBILE_NUMBER,
  ROUTE_AUTHENTICATION_VERIFICATION_CODE,
  ROUTE_COUNTRY_CODE_SELECT,
} from '../../../navigators/routeNames';
import { apolloErrorToString } from '../../../utils/errorCodes';

type MobileScreenRouteProp = RouteProp<AuthenticationStackParamList, typeof ROUTE_AUTHENTICATION_MOBILE_NUMBER>;
type MobileScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthenticationStackParamList, typeof ROUTE_AUTHENTICATION_MOBILE_NUMBER>,
  StackNavigationProp<ModalNavigatorParamList>
>;

interface Props {
  navigation: MobileScreenNavigationProp;
  route: MobileScreenRouteProp;
}

const AuthenticationMobileNumber: FC<Props> = ({ navigation, route }) => {
  const headerHeight = useHeaderHeight();

  const [userSendPhoneNumberVerificationCode, { loading, error }] = useUserSendPhoneNumberVerificationCodeMutation();
  const [areaCode, setAreaCode] = useState<string>('+61');
  const [phoneNum, setPhoneNum] = useState<string>('');

  const disabled = phoneNum.length === 0;

  useEffect(() => {
    if (route?.params?.countryCode !== undefined) {
      setAreaCode(route.params.countryCode);
    }
  }, [route.params]);

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      const parsedNumber = parsePhoneNumberFromString(`${areaCode.trim()}${phoneNum.trim()}`);

      if (!parsedNumber) {
        return;
      }

      const result = await userSendPhoneNumberVerificationCode({
        variables: { mobileNumber: parsedNumber?.number as string },
      });

      if (result.data?.userSendPhoneNumberVerificationCode) {
        navigation.navigate(ROUTE_AUTHENTICATION_VERIFICATION_CODE, { mobileNumber: parsedNumber.number as string });
      }
    } catch (err) {
      // (error handled by error from useMutation hook, empty catch added to prevent unhandled error excpetion)
    }
  };

  const onCountryCodeSelected = (countryCode: string) => {
    setAreaCode(countryCode);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : headerHeight + 20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text>{"What's your mobile number?"}</Text>
          </View>
          <View style={styles.phoneContainer}>
            <AppTextInput
              value={areaCode}
              onFocus={() =>
                navigation.navigate(ROUTE_COUNTRY_CODE_SELECT, { onCountryCodeSelected: onCountryCodeSelected })
              }
              style={styles.areaCode}
              keyboardType='phone-pad'
              maxLength={4}
              selectionColor='transparent'
              containerStyle={styles.areaCodeContainer}
            />
            <AppTextInput
              value={phoneNum}
              error={!!error}
              onChangeText={(text: string) => {
                setPhoneNum(text);
              }}
              style={styles.input}
              keyboardType='phone-pad'
              maxLength={12}
              textContentType='telephoneNumber'
              onSubmitEditing={() => {
                if (!disabled) {
                  onSubmit();
                }
              }}
              containerStyle={styles.phoneInputContainer}
            />
          </View>
          <View style={styles.errorMsgContainer}>
            {error && <Text style={styles.errorMsg}>{apolloErrorToString(error)}</Text>}
          </View>
          <View style={styles.instructionContainer}>
            <Text>We will send you a text with a verification code. This information will be private.</Text>
          </View>
        </ScrollView>
        <BlockButton
          text='Confirm'
          onPress={onSubmit}
          loading={loading}
          disabled={disabled}
          containerStyle={styles.buttonContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthenticationMobileNumber;

const styles = StyleSheet.create({
  areaCode: {
    flex: 0,
    paddingRight: 15,
  },
  areaCodeContainer: {
    marginRight: 8,
  },
  buttonContainer: {
    marginBottom: ifIphoneX(15, 20),
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  errorMsg: {
    color: theme.colors.error,
  },
  errorMsgContainer: {
    height: 46,
    marginVertical: 9,
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  input: {
    flex: 1,
  },
  instructionContainer: {
    marginBottom: 38,
  },
  phoneContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  phoneInputContainer: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  titleContainer: {
    marginVertical: 30,
  },
});
