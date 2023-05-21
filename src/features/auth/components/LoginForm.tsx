import CheckImage from '@assets/images/check-ic.png';
import EyeIcon from '@assets/images/eye-ic.png';
import EyeOffIcon from '@assets/images/eye-off-ic.png';
import AppErrorLabel from '@components/AppError';
import AppText from '@components/AppText';
import AppTextField from '@components/AppTextField';
import BlockButton from '@components/BlockButton';
import useAuthToken from '@hooks/useAuthToken';
import { apolloErrorToString } from '@utils/errorCodes';
import theme from '@utils/theme';
import { Formik, FormikProps } from 'formik';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useUserLoginMutation } from '../../../graphql/generated';
import { useAppDispatch, useAppSelector } from '../../../store';
import { LoginFormFields, LoginFormValues, loginValidationSchema } from '../formik/LoginFormValues';
import { SET_REMEMBER_ME } from '../store/authTypes';

const LoginForm = () => {
  const formRef = useRef<FormikProps<LoginFormValues>>(null);

  const [_, setAuthToken] = useAuthToken();
  const { emailRemember, rememberMe: rememberMeGlobal } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const INITIAL_VALUES: LoginFormValues = useMemo(() => {
    return {
      [LoginFormFields.EMAIL]: emailRemember,
      [LoginFormFields.PASSWORD]: '',
    };
  }, [emailRemember]);

  const [securePassword, setSecurePassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(rememberMeGlobal);
  const [userLogin, { loading, error: loginError }] = useUserLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data } = await userLogin({
        variables: {
          email: values[LoginFormFields.EMAIL],
          password: values[LoginFormFields.PASSWORD],
        },
      });

      if (data) {
        setAuthToken(data.session.token);
        dispatch({
          type: SET_REMEMBER_ME,
          payload: {
            rememberMe: rememberMe,
            emailRemember: rememberMe ? values[LoginFormFields.EMAIL] : '',
          },
        });
      }
    } catch (error) {
      console.debug(error);
    }
  };

  const securePasswordToggle = useCallback(() => {
    setSecurePassword(!securePassword);
  }, [securePassword]);

  const onRememberMePress = useCallback(() => {
    setRememberMe(!rememberMe);
  }, [rememberMe]);

  return (
    <View style={styles.container}>
      <Formik<LoginFormValues>
        innerRef={formRef}
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={loginValidationSchema}
        validateOnChange
        validateOnMount>
        {({ isValid, submitForm }: FormikProps<LoginFormValues>) => {
          return (
            <View>
              <AppText style={styles.title}>Iniciar sesión</AppText>

              <AppTextField
                title='Correo electrónico'
                titleStyle={styles.label}
                fieldName={LoginFormFields.EMAIL}
                style={styles.input}
                keyboardType='email-address'
                autoCapitalize='none'
                placeholderTextColor={theme.colors.neutral50}
                placeholder='correo@coquimate.com.co'
                inputContainerStyle={styles.inputContainer}
                highlightOnFocus
              />

              <View>
                <AppTextField
                  title='Contraseña'
                  titleStyle={styles.label}
                  fieldName={LoginFormFields.PASSWORD}
                  style={styles.input}
                  secureTextEntry={securePassword}
                  autoCapitalize='none'
                  placeholderTextColor={theme.colors.neutral50}
                  placeholder='Ingrese contraseña'
                  inputContainerStyle={styles.inputContainer}
                  highlightOnFocus
                />
                <View style={styles.showPasswordContainer}>
                  <TouchableOpacity onPress={securePasswordToggle}>
                    {securePassword ? <Image source={EyeOffIcon} /> : <Image source={EyeIcon} />}
                  </TouchableOpacity>
                </View>
              </View>
              <Pressable style={styles.pressableCheck} onPress={onRememberMePress}>
                <View style={[styles.checkBox, rememberMe ? styles.checked : styles.unChecked]}>
                  <Image source={CheckImage} />
                </View>
                <AppText size={15} color={theme.colors.neutral70}>
                  Recuérdame
                </AppText>
              </Pressable>
              <Pressable onPress={() => console.debug('forgot password')} />

              <View>
                {loginError && <AppErrorLabel style={styles.error}>{apolloErrorToString(loginError)}</AppErrorLabel>}
              </View>

              <BlockButton
                text={'Ingresar'}
                onPress={submitForm}
                loading={loading}
                disabled={!isValid}
                containerStyle={styles.buttonContainer}
                buttonColor={theme.colors.primary}
                textColor={theme.colors.white}
              />
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
  checkBox: {
    width: 24,
    height: 24,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  checked: {
    backgroundColor: theme.colors.primary,
  },
  container: {
    width: '100%',
    maxWidth: 500,
  },
  error: {
    marginVertical: 10,
  },
  input: {
    fontFamily: theme.fonts.poppins400,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: theme.colors.neutral20,
  },
  label: {
    color: theme.colors.neutral70,
  },
  pressableCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showPasswordContainer: {
    position: 'absolute',
    right: 20,
    top: 46,
  },
  title: {
    fontFamily: theme.fonts.poppins700,
    fontSize: 28,
    color: theme.colors.primary,
    marginBottom: 30,
    textAlign: 'center',
  },
  unChecked: {
    backgroundColor: theme.colors.bg70,
  },
});

export default LoginForm;
