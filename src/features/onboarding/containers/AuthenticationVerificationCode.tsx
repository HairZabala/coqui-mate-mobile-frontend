import SmoothPinCodeInput from '@dreamwalk-os/react-native-smooth-pincode-input';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/core';
import { useHeaderHeight } from '@react-navigation/elements';
import { CommonActions } from '@react-navigation/routers';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '@utils/theme';
import React, { FC, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { SafeAreaView } from 'react-native-safe-area-context';
import BlockButton from '../../../components/BlockButton';
import {
  useUserLoginOrSignupMutation,
  useUserSendPhoneNumberVerificationCodeMutation,
} from '../../../graphql/generated';
import useAuthToken from '../../../hooks/useAuthToken';
import { AuthenticationStackParamList } from '../../../navigators/AuthenticationNavigator';
import { ModalNavigatorParamList } from '../../../navigators/ModalNavigator';
import { ROUTE_AUTHENTICATED_NAVIGATOR, ROUTE_AUTHENTICATION_VERIFICATION_CODE } from '../../../navigators/routeNames';
import { apolloErrorToString } from '../../../utils/errorCodes';
import * as RootNavigation from '../../../utils/rootNavigation';

type VerificationScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<AuthenticationStackParamList, typeof ROUTE_AUTHENTICATION_VERIFICATION_CODE>,
  StackNavigationProp<ModalNavigatorParamList>
>;
type VerificationScreenRouteProp = RouteProp<
  AuthenticationStackParamList,
  typeof ROUTE_AUTHENTICATION_VERIFICATION_CODE
>;

interface Props {
  navigation: VerificationScreenNavigationProp;
  route: VerificationScreenRouteProp;
}

const PIN_CODE_LENGTH = 5;

const AuthenticationVerificationCode: FC<Props> = ({ navigation, route }: Props) => {
  const headerHeight = useHeaderHeight();
  const { mobileNumber } = route.params;

  const [userLoginOrSignup, { loading: verifiyLoading, error: verifyError }] = useUserLoginOrSignupMutation();
  const [userSendPhoneNumberVerificationCode, { loading: resendLoading }] =
    useUserSendPhoneNumberVerificationCodeMutation();

  const [verificationCode, setVerificationCode] = useState<string>('');

  const [, setAuthToken] = useAuthToken();

  const onResend = async () => {
    try {
      await userSendPhoneNumberVerificationCode({ variables: { mobileNumber: mobileNumber } });
    } catch (e) {
      // (error handled by error from useMutation hook, empty catch added to prevent unhandled error excpetion)
    }
  };

  const onSubmit = async () => {
    try {
      Keyboard.dismiss();
      const { data } = await userLoginOrSignup({
        variables: { phoneNumber: mobileNumber!, verificationCode: verificationCode },
      });
      if (data) {
        setAuthToken(data.userLoginOrSignup.token);

        RootNavigation.dispatch(CommonActions.reset({ index: 1, routes: [{ name: ROUTE_AUTHENTICATED_NAVIGATOR }] }));
      }
    } catch (err) {
      // (error handled by error from useMutation hook, empty catch added to prevent unhandled error excpetion)
    }
  };

  const onFulfill = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? headerHeight : headerHeight + 20}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='never' showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Enter {PIN_CODE_LENGTH}-Digit code</Text>
          </View>
          <View style={styles.changeNumContainer}>
            <Text>{`Code sent to ${mobileNumber} `}</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.instructionBtnYellow}>Change</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pinContainer}>
            <SmoothPinCodeInput
              value={verificationCode}
              onTextChange={setVerificationCode}
              codeLength={PIN_CODE_LENGTH}
              restrictToNumbers
              onFocus={() => {
                if (verificationCode.length === PIN_CODE_LENGTH) {
                  setVerificationCode(verificationCode.slice(0, PIN_CODE_LENGTH - 1));
                }
              }}
              onFulfill={onFulfill}
              cellStyle={styles.cell}
              cellStyleFocused={styles.cell}
              cellSpacing={14}
              textStyle={styles.cellText}
              containerStyle={styles.cellsContainer}
            />
          </View>
          <View style={styles.errorMsgContainer}>{verifyError && <Text>{apolloErrorToString(verifyError)}</Text>}</View>
          <View style={styles.resendContainer}>
            <Text>{'Didn’t receive a pin? '}</Text>
            <TouchableOpacity onPress={onResend}>
              <Text style={styles.instructionBtnBlack}>Resend</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BlockButton
          text='Confirm'
          onPress={onSubmit}
          loading={verifiyLoading || resendLoading}
          disabled={verificationCode.length !== PIN_CODE_LENGTH}
          containerStyle={styles.buttonContainer}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthenticationVerificationCode;

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: ifIphoneX(15, 20),
  },
  cell: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: theme.colors.black,
    height: 86,
    width: 55,
  },
  cellText: {
    fontSize: 40,
    lineHeight: 60,
    textAlign: 'center',
    color: theme.colors.black,
  },
  cellsContainer: {
    height: 86,
    width: 270,
  },
  changeNumContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 20,
    flex: 1,
  },
  errorMsgContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  instructionBtnBlack: {},
  instructionBtnYellow: {},
  pinContainer: {
    alignItems: 'center',
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  title: {
    alignSelf: 'center',
  },
  titleContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
});
